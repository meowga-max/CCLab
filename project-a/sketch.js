let bodyW, bodyH, pleats, eyeGap;
let doughR, doughG, doughB;
let blushR, blushG, blushB;

// ---------- state ----------
let cx = 400; // x position of the spirit
let baseY = 374; // where the spirit sits in the steamer
let energy = 0.8; // 1 = wide awake, 0 = asleep
let hot = false; // becomes true after the first click
let heat = 0; // 0 = cool, 1 = fully steamed up
let squish = 0; // squash and stretch
let squishSpeed = 0;
let blush = 0;
let burst = 0; // counts down after a click
let wasPressed = false;

function setup() {
  createCanvas(800, 500);

  bodyW = random(90, 125);
  bodyH = random(58, 72);
  pleats = floor(random(9, 18));
  eyeGap = random(22, 36);
  doughR = random(238, 252);
  doughG = random(224, 240);
  doughB = random(198, 225);

  let pick = floor(random(4));
  if (pick == 0) {
    blushR = 255;
    blushG = 150;
    blushB = 160;
  } else if (pick == 1) {
    blushR = 255;
    blushG = 170;
    blushB = 120;
  } else if (pick == 2) {
    blushR = 240;
    blushG = 120;
    blushB = 150;
  } else {
    blushR = 255;
    blushG = 125;
    blushB = 125;
  }
}

function draw() {
  background(70, 50, 52);
  noStroke();
  fill(122, 80, 50);
  rect(0, 330, width, 170);
  stroke(102, 66, 40);
  strokeWeight(2);
  for (let y = 355; y < height; y += 30) {
    line(0, y, width, y);
  }

  let d = dist(mouseX, mouseY, cx, baseY - bodyH * 0.8);

  // a new click on the spirit steams it up
  if (mouseIsPressed == true && wasPressed == false && d < bodyW) {
    hot = true;
    burst = 60;
    squishSpeed = -0.3; // it jumps
  }
  wasPressed = mouseIsPressed;

  if (hot == true) {
    heat = lerp(heat, 1, 0.03); // warms up and stays hot
    energy = 1;
  } else {
    energy = constrain(energy - 0.0005, 0, 1); // slowly gets sleepy
  }

  // spring for squash and stretch
  squishSpeed = squishSpeed - squish * 0.2;
  squishSpeed = squishSpeed * 0.85;
  squish = squish + squishSpeed;

  // blushes when the mouse is close (and always when hot)
  let near = constrain(map(d, 250, 60, 0, 1), 0, 1);
  blush = lerp(blush, max(near, heat), 0.06);

  if (burst > 0) {
    burst = burst - 1;
  }

  let sleepy = constrain(map(energy, 0.1, 0.45, 1, 0), 0, 1);

  noStroke();
  fill(90, 58, 36);
  ellipse(400, 452, 360, 40); // shadow
  fill(170, 122, 66);
  stroke(140, 98, 50);
  strokeWeight(2);
  ellipse(400, 345, 340, 70);
  noStroke();
  fill(96, 64, 34);
  ellipse(400, 347, 314, 56);

  // ================= SPIRIT =================
  let breathe =
    sin(frameCount * (lerp(0.02, 0.06, energy) + heat * 0.03)) * 0.04;
  let w = bodyW * (1 + squish + breathe * 0.5);
  let h = bodyH * (1 - squish + breathe);
  let centerY = baseY - h * 0.35;
  let peakY = centerY - h * 1.3;

  // the dough turns warm and pink when it is hot
  let r = lerp(doughR, 255, heat);
  let g = lerp(doughG, 212, heat);
  let b = lerp(doughB, 195, heat);

  // body: round with a flat bottom and a pinched top
  fill(r, g, b);
  stroke(r - 45, g - 50, b - 55);
  strokeWeight(2);
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.05) {
    let wob =
      1 + (noise(cos(a) + 1, sin(a) + 1, frameCount * 0.01) - 0.5) * 0.08;
    let s = sin(a);
    let x = cx + cos(a) * w * wob;
    let y = centerY + s * h * 0.35;
    if (s < 0) {
      let s8 = s * s * s * s * s * s * s * s;
      y = centerY + s * h * wob * (1 + 0.3 * s8);
    }
    vertex(x, y);
  }
  endShape(CLOSE);

  // pleats swirl up to the top knot
  noFill();
  stroke(r - 40, g - 45, b - 50);
  strokeWeight(1.5);
  for (let i = 0; i < pleats; i++) {
    let a = map(i, 0, pleats - 1, PI + 0.4, TWO_PI - 0.4);
    let sx = cx + cos(a) * w * 0.8;
    let sy = centerY + sin(a) * h * 0.6;
    let sway = sin(frameCount * 0.04 + i) * 3;
    bezier(
      sx,
      sy,
      cx + (sx - cx) * 0.5 + sway,
      sy - 20,
      cx + sway,
      peakY + 25,
      cx,
      peakY + 6
    );
  }
  noStroke();
  fill(r - 12, g - 15, b - 18);
  ellipse(cx, peakY + 6, 14, 10); // top knot

  // cheeks
  let eyeY = centerY - h * 0.1;
  fill(blushR, blushG, blushB, 50 + blush * 170);
  ellipse(cx - eyeGap - 15, eyeY + 13, 20, 10);
  ellipse(cx + eyeGap + 15, eyeY + 13, 20, 10);

  // eyes follow the mouse
  let lookX =
    constrain(map(mouseX - cx, -300, 300, -3, 3), -3, 3) * (1 - sleepy);
  let lookY =
    constrain(map(mouseY - eyeY, -200, 200, -3, 3), -3, 3) * (1 - sleepy);
  let eyeH = lerp(13, 2, sleepy);
  fill(45, 30, 30);
  ellipse(cx - eyeGap + lookX, eyeY + lookY, 11, eyeH);
  ellipse(cx + eyeGap + lookX, eyeY + lookY, 11, eyeH);
  if (sleepy < 0.5) {
    fill(255);
    ellipse(cx - eyeGap + lookX + 2, eyeY + lookY - 3, 3.5, 3.5);
    ellipse(cx + eyeGap + lookX + 2, eyeY + lookY - 3, 3.5, 3.5);
  }

  // mouth
  if (sleepy > 0.8) {
    fill(150, 70, 70);
    let o = 4 + sin(frameCount * 0.04) * 1.5;
    ellipse(cx, eyeY + 14, o, o); // snoring "o"
  } else if (hot == true || blush > 0.6) {
    fill(190, 80, 90);
    arc(cx, eyeY + 11, 14, 12, 0, PI); // happy open mouth
  } else {
    noFill();
    stroke(110, 60, 60);
    strokeWeight(2);
    arc(cx, eyeY + 11, 10, 6, 0, PI); // small smile
  }

  // ================= STEAMER (front) =================
  fill(198, 152, 90);
  stroke(150, 105, 55);
  strokeWeight(2);
  beginShape();
  for (let a = 0; a <= PI; a += 0.05) {
    vertex(400 + cos(a) * 170, 345 + sin(a) * 35);
  }
  for (let a = PI; a >= 0; a -= 0.05) {
    vertex(400 + cos(a) * 170, 415 + sin(a) * 35);
  }
  endShape(CLOSE);
  noFill();
  stroke(165, 118, 65);
  for (let k = 1; k < 4; k++) {
    beginShape();
    for (let a = 0; a <= PI; a += 0.05) {
      vertex(400 + cos(a) * 170, 345 + k * 17 + sin(a) * 35);
    }
    endShape();
  }
  for (let a = 0.35; a < PI; a += 0.5) {
    line(
      400 + cos(a) * 170,
      345 + sin(a) * 35,
      400 + cos(a) * 170,
      415 + sin(a) * 35
    );
  }
  stroke(228, 188, 124);
  strokeWeight(4);
  beginShape();
  for (let a = 0; a <= PI; a += 0.05) {
    vertex(400 + cos(a) * 170, 345 + sin(a) * 35);
  }
  endShape();

  // ================= STEAM =================
  // each puff rises, drifts with noise, grows and fades, then starts again
  noStroke();
  for (let i = 0; i < 30; i++) {
    // cool: every 3rd puff, sleepy: every 6th puff, hot: all 30 puffs
    let show = i % 3 == 0;
    if (energy < 0.3) {
      show = i % 6 == 0;
    }
    if (heat > 0.5) {
      show = true;
    }
    if (show == true) {
      let t = (frameCount * (0.8 + heat * 0.6) + i * 7.3) % 220; // how far it has risen
      let px = cx + (noise(i * 0.7, frameCount * 0.005) - 0.5) * t * 0.8;
      let py = peakY - t;
      let size = 8 + t * 0.18 + heat * 10;
      fill(255, 250, 245, map(t, 0, 220, 150, 0));
      ellipse(px, py, size, size);
    }
  }

  // a ring of steam bursts out after a click
  if (burst > 0) {
    let age = 60 - burst;
    for (let i = 0; i < 20; i++) {
      let a = (i * TWO_PI) / 20 + noise(i) * 0.5;
      let rr = 70 + age * 3;
      fill(255, 250, 245, map(age, 0, 60, 160, 0));
      ellipse(
        cx + cos(a) * rr * 1.4,
        centerY - 20 + sin(a) * rr * 0.6 - age * 0.8,
        20 + age * 0.4
      );
    }
  }

  // z z z when it is asleep
  if (sleepy > 0.8) {
    textSize(18);
    for (let i = 0; i < 3; i++) {
      let t = (frameCount * 0.5 + i * 40) % 120;
      fill(255, 240, 220, map(t, 0, 120, 255, 0));
      text(
        "z",
        cx + 35 + t * 0.2 + sin(frameCount * 0.05 + i) * 5,
        peakY + 10 - t
      );
    }
  }
}