/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let Dancer;

function setup() {
  // no adjustments in the setup function needed...
  createCanvas(windowWidth, windowHeight);

  // ...except to adjust the dancer's name on the next line:
  dancer = new FatBunnyDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class FatBunnyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
  }

  update() {
    this.angle = sin(frameCount * 0.05) * 0.2;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    fill(255);
    stroke(60);
    strokeWeight(3);

    ellipse(-25, -50, 26, 50);
    ellipse(25, -50, 26, 50);

    ellipse(-28, 80, 32, 18);
    ellipse(28, 80, 32, 18);

    ellipse(0, 25, 130, 115);

    ellipse(-60, 30, 20, 26);
    ellipse(60, 30, 20, 26);

    noStroke();
    fill(255, 180, 190);
    ellipse(-25, -50, 11, 30);
    ellipse(25, -50, 11, 30);

    fill(255, 160, 170);
    ellipse(-30, 30, 16, 9);
    ellipse(30, 30, 16, 9);

    fill(40);
    circle(-18, 18, 7);
    circle(18, 18, 7);

    fill(255, 140, 160);
    ellipse(0, 26, 7, 5);

    noFill();
    stroke(60);
    strokeWeight(2);
    arc(-4, 30, 8, 6, 0, PI);
    arc(4, 30, 8, 6, 0, PI);

    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/