"use strict";
// taken from examples/presentation
class SprayDrop {
  constructor(x, y, minAngle, maxAngle) {
    this.pos = new Vector(x, y);
    this.gravity = new Vector(0, -0.1);
    this.startPos = new Vector(x, y);
    this.startTime = Math.round(Math.random() * 10000); // changed
    this.alive = false;
    this.transparency = 1;
    this.transparencyDec = 0.05;
    this.length = (Math.random() * 10) + 3;             // changed
    this.velocity = this.setDirectionVector(minAngle, maxAngle);  // changed
    this.velocity.multiply(Math.random() * 5);
    this.startVector = this.velocity.clone();
    this.red = 0; this.green = 0; this.blue = 0;
    this.startColor = [192, 192, 192];                  // changed
    this.endColor = [220, 220, 220];                    // changed
    this.interpColor;
  }
  setDirectionVector(minAngle, maxAngle) {
    let toRadians = Math.PI / 180;
    let range, newangle;
    range = maxAngle - minAngle;
    newangle = minAngle + Math.random() * range; // generate a random angle between min and max angles
    let xd = Math.cos(newangle * toRadians);// calc the rotated direction vector x value
    let yd = Math.sin(newangle * toRadians);// calc the rotated direction vector y value
    return (new Vector(xd, yd))
  }

  updateOnPosition() {
    if (this.pos.x > ctx.canvas.width || this.pos.x < 0) {
      this.pos.x = carStartX;
      this.pos.y = carStartY;
      this.velocity = this.startVector.clone()
      this.transparency = 1;
      this.red = this.startColor[0]; this.green = this.startColor[1]; this.blue = this.startColor[2];
    }
    if (this.pos.y > ctx.canvas.height || this.pos.y < 0) {
      this.pos.x = carStartX;
      this.pos.y = carStartY;
      this.velocity = this.startVector.clone()
      this.transparency = 1;
      this.red = this.startColor[0]; this.green = this.startColor[1]; this.blue = this.startColor[2];
    }
  }
  update(count) {
    if (count == this.startTime) {
      this.alive = true;
      this.pos.x = carStartX;   // changed
      this.pos.y = carStartY;   // changed
      //this.updateVelocity(minAngle, maxAngle);  // changed
    }
    if (this.alive) {
      this.transparency -= this.transparencyDec;
      this.interpColor = this.interpolateColor(this.startColor, this.endColor, (1 - this.transparency));
      this.red = this.interpColor[0]; this.green = this.interpColor[1]; this.blue = this.interpColor[2];
      this.velocity.add(this.gravity)
      this.pos.add(this.velocity);
      this.updateOnTransparency();
    }
  }

  // updateVelocity(minAngle, maxAngle){    // added to the original
  //   this.velocity = this.setDirectionVector(minAngle, maxAngle); //360, 340, 180, 200
  //   this.velocity.multiply(Math.random() * 5);
  //   this.startVector = this.velocity.clone();
  // }

  updateOnTransparency() {
    if (this.transparency < 0) {
      this.pos.x = carStartX;
      this.pos.y = carStartY;
      this.velocity = this.startVector.clone()
      this.transparency = 1;
      this.red = this.startColor[0]; this.green = this.startColor[1]; this.blue = this.startColor[2];
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);

    ctx.fillStyle = 'rgba(' + this.red + "," + this.green + "," + this.blue + "," + this.transparency + ")"
    // ctx.strokeStyle = 'rgba(' + this.red + "," + this.green + "," + this.blue + "," + 1+')'//this.transparency + ")"
    ctx.beginPath();
    ctx.arc(0, 0, this.length, 0, 2 * Math.PI);
    // ctx.moveTo(0, 0);
    // ctx.lineTo(this.velocity.x*this.length, this.velocity.y*this.length);
    // ctx.stroke()
    ctx.fill();
    ctx.restore();
    this.rotate += this.rotationInc;
  }
  interpolateColor(acolor, bcolor, proportion) {
    let rcol = acolor[0] + ((bcolor[0] - acolor[0]) * proportion);
    let gcol = acolor[1] + ((bcolor[1] - acolor[1]) * proportion);
    let bcol = acolor[2] + ((bcolor[2] - acolor[2]) * proportion);
    let result = [rcol, gcol, bcol];
    return result;
  }
}
class Spray {
  constructor(size) {
    this.size = size;
    this.array = [];
    this.scale;
    this.count = 0;
  }
  init(minAngle, maxAngle) {
    for (let i = 0; i < this.size; i++) {
      this.array.push(new SprayDrop(carStartX, carStartY, minAngle, maxAngle)) //changed
    }
  }
  update(carX) {  // changed

    carStartX = carX;
    //carStartY = 470;

    for (let i = 0; i < this.size; i++) {
      this.array[i].update(this.count);
    }
    this.count++;
  }
  draw() {

    for (let i = 0; i < this.size; i++) {
      if (this.array[i].alive) {
        this.array[i].draw();
      }
    }
  }
}
let carStartX = 970;
let carStartY = 470;









