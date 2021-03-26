class Calf extends Sprite {

    constructor(name, pos, frames, spriteWidth, spriteHeight, delay) {
        super(name, pos, frames, spriteWidth, spriteHeight, delay);

        this.imag1stScene = document.createElement("img");
        this.img1stSceneSrc = "./images/calf2.png";
        this.imag1stScene.src = this.img1stSceneSrc; // by default
        this.img1stSceneSrc2 = "./images/calf1scared.png";

        this.animDelay = delay;
        this.sheetCols = frames;
        this.count2 = 0;
    }

    drawAnim() {  // this method is for the last scene

        calf.pos.x = ctx.canvas.width / 2;
        calf.pos.y = ctx.canvas.height / 2;

        ctx.save()
        ctx.translate(this.pos.x, this.pos.y);
        ctx.translate(-this.spriteW / 2, -this.spriteH / 2);

        if (radius < 1) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        } else {
            if (radius <= 120 && radius >= 119) {


                if (this.col == 2) {

                    radius = radius - 0.02;
                }
                this.col = this.index % this.sheetCols;
                ctx.drawImage(this.image, this.col * this.spriteW, this.row * this.spriteH, this.spriteW, this.spriteH, 0, 0, this.spriteW, this.spriteH);


            } else {
                ctx.drawImage(this.image, 0, 1, this.spriteW, this.spriteH, 0, 0, this.spriteW, this.spriteH);
                if (radius < 120) {
                    radius = radius - 0.25;
                } else
                    radius--;
            }
        }


        ctx.restore();

        this.drawCircleAroundCalf();

        this.count += 1;
        if (this.count % this.animDelay == 0) {
            this.count = 0;
            this.index += 1;
            this.index = this.index % this.frames;
            this.count2++;
        }

    }

    drawCircleAroundCalf() {

        ctx.save()
        ctx.globalCompositeOperation = 'destination-atop';
        ctx.beginPath();

        ctx.arc(490, 160, radius, 0, 2 * Math.PI);

        ctx.fillStyle = 'white'

        ctx.fill()
        ctx.restore()


        if (radius > 1) {
            ctx.beginPath();
            ctx.arc(490, 160, radius + 10, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }

    }

    draw() {
        ctx.save();
      // ctx.globalAlpha = this.transparency;
      // ctx.translate(this.pos.x, this.pos.y);
      // ctx.rotate(this.rotate);
      if(this.flipY){ctx.scale(-this.scale, this.scale);}
      // else{ctx.scale(this.scale, this.scale);}
      // ctx.translate(-this.spriteW / 2, -this.spriteH / 2);
      ctx.drawImage(this.imag1stScene, this.pos.x, this.pos.y, 200, 180);
      ctx.restore();
    }
}