class Sun extends Sprite {
  constructor(name, pos, frames, spriteWidth, spriteHeight, delay){
    super(name, pos, frames, spriteWidth, spriteHeight, delay);

    this.sunClock = 0;
    this.restartSunClock = true;
  }

  sunClockCount (){
      this.sunClock++;
  }
}

class FarmBackground {

  constructor(name, pos, width, height) {
    this.image = document.createElement("img");
    this.image.src = name;
    this.pos = new Vector(pos[0], pos[1]);
    this.width = width;
    this.height = height;

    this.sun = new Sun("./images/sunSP.png", new Vector(600, 65), 3, 133, 105, 40);
    this.sun.sheetRows = 1;
    this.sun.sheetCols = 3;
  }

  draw() {
    ctx.drawImage(this.image, 0, this.pos.y, this.width, this.height);
    this.sun.drawAnim();
  }

  scrollBackground(back2, speed, rightToLeft) {

    if (rightToLeft) {
      speed = -speed;
      ctx.drawImage(this.image, this.pos.x - this.width, this.pos.y, this.width, this.height);
      ctx.drawImage(back2.image,
        0, 0, Math.abs(this.pos.x - this.width), this.height,
        this.width + (this.pos.x - this.width), 0, 
        Math.abs(this.pos.x - this.width), this.height);

      this.sun.drawAnim();

      if (this.pos.x >= -this.width) {
        this.pos.x += speed; back2.pos.x += speed;
      }
    } else {
      ctx.drawImage(back2.image, this.pos.x, this.pos.y, this.width, this.height);
      ctx.drawImage(this.image,
        this.width - this.pos.x, 0, Math.abs(this.pos.x), this.height,
        0, 0, Math.abs(this.pos.x), this.height);


      this.sun.drawAnim();

      if (this.pos.x <= this.width) {
        this.pos.x += speed; back2.pos.x += speed;
      }
    }



  }


}