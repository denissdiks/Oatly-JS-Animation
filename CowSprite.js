class CowSprite extends Sprite {

    constructor(name, pos, frames, spriteWidth, spriteHeight, delay) {

        super(name, pos, frames, spriteWidth, spriteHeight, delay);

        this.cowsHeadImage = document.createElement("img");
        this.cowsHeadImage.src = "./images/cow/cowsHead.png";
        this.cowsHeadPos = new Vector(this.pos.x + 100, this.pos.y - 20);  //140, 195
        this.cowsHeadW = 305;
        this.cowsHeadH = 249;
        this.translateX;
        this.translateY;

        this.moveHead = 0;      // rotation
        this.moveHeadUp = true;

        this.list = [];
        this.tx = 0;
    }

    draw() {
        ctx.save();

        ctx.drawImage(this.image, 0, 0, this.spriteW, this.spriteH, this.pos.x + this.tx, this.pos.y, this.spriteW, this.spriteH);
        ctx.restore();
    }

    run() {
        this.list = [1, 2, 3, 4, 5, 6];
        ctx.save();
        ctx.translate(this.pos.x + this.tx, this.pos.y);
        this.drawAnim();
        ctx.restore();
        this.cowHeadMove(3);
        //this.tx++;
    }

    drawAnim() {
        ctx.save()

        if (this.index >= this.list.length) {
            this.index = 0;
        }

        ctx.drawImage(this.image, this.list[this.index] * this.spriteW, 0, this.spriteW, this.spriteH,
            0, 0, this.spriteW, this.spriteH);
        
        ctx.restore();

        this.count += 1;
        if (this.count % this.animDelay == 0) {
            this.count = 0;
            this.index += 1;

            if (this.index == this.list.length) {
                this.index = 0;
            }
        }
    }

    drawCowStill() {
        this.draw();
        ctx.save();

        this.translateX = (this.cowsHeadPos.x * 2 + this.cowsHeadW) / 2;
        this.translateY = (this.cowsHeadPos.y * 2 + this.cowsHeadH) / 2;

        ctx.translate(this.translateX, this.translateY);
        ctx.scale(-this.scale, this.scale);
        ctx.translate(-this.translateX, -this.translateY);
        ctx.drawImage(this.cowsHeadImage, 0 * this.cowsHeadW, 0, this.cowsHeadW, this.cowsHeadH, this.cowsHeadPos.x, this.cowsHeadPos.y, this.cowsHeadW, this.cowsHeadH);
        ctx.restore();

    }

    drawCowSuspicious() {
        this.draw();
        ctx.drawImage(this.cowsHeadImage, 1 * this.cowsHeadW, 0, this.cowsHeadW, this.cowsHeadH, this.cowsHeadPos.x, this.cowsHeadPos.y, this.cowsHeadW, this.cowsHeadH);
    }

    drawCowScared() {
        this.draw();
        ctx.drawImage(this.cowsHeadImage, 2 * this.cowsHeadW, 0, this.cowsHeadW, this.cowsHeadH, this.cowsHeadPos.x + this.tx, this.cowsHeadPos.y, this.cowsHeadW, this.cowsHeadH);
    }

    drawCowScream() {
        this.draw();
        ctx.drawImage(this.cowsHeadImage, 3 * this.cowsHeadW, 0, this.cowsHeadW, this.cowsHeadH, this.cowsHeadPos.x, this.cowsHeadPos.y, this.cowsHeadW, this.cowsHeadH);
    }

    drawCowHeadMove(emotion) {
        this.draw();
        this.cowHeadMove(emotion);
    }

    cowHeadMove(emotion) { // only 4 emotion [0..3]

        ctx.save();
        this.translateX = (this.cowsHeadPos.x * 2 + this.cowsHeadW) / 2;
        this.translateY = (this.cowsHeadPos.y * 2 + this.cowsHeadH) / 2;

        ctx.translate(this.translateX + this.tx, this.translateY);
        ctx.rotate(this.moveHead);
        ctx.translate(-this.translateX, -this.translateY);

        if (this.moveHeadUp) {
            this.moveHead += 0.002;
        } else {
            this.moveHead -= 0.002;
        }

        // draw the head
        ctx.drawImage(this.cowsHeadImage, emotion * this.cowsHeadW, 0, this.cowsHeadW, this.cowsHeadH, this.cowsHeadPos.x, this.cowsHeadPos.y, this.cowsHeadW, this.cowsHeadH);

        ctx.restore();

        this.moveHeadCheck();
    }

    moveHeadCheck() {
        if (this.moveHead >= 0.1) {
            this.moveHeadUp = false;
        }
        if (this.moveHead <= -0.3) {
            this.moveHeadUp = true;
        }
    }
}