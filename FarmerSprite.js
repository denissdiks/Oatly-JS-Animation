class Farmer extends Sprite {
    constructor(name, pos, frames, spriteWidth, spriteHeight, delay) {
        
        super(name, pos, frames, spriteWidth, spriteHeight, delay);

        this.list = [];
        this.tx = 0;
    }

    // taken from lecture slides
    idle() {
        this.list = [0];
        ctx.save();
        ctx.translate(this.pos.x + this.tx, this.pos.y);
        ctx.scale(1, 1);
        ctx.translate(-this.pos.x, -this.pos.y);
        this.drawAnim();
        ctx.restore();
    }

    // taken from lecture slides, slightly modified
    walkLeft() {
        this.list = [1, 2, 3, 4, 5, 6];
        ctx.save();
        ctx.translate(this.pos.x + this.tx, this.pos.y);
        ctx.scale(-1, 1);
        ctx.translate(-this.pos.x, -this.pos.y);
        this.tx -= 0.7;
        this.drawAnim()
        
        ctx.restore();
    }

    // taken from lecture slides, slightly modified
    walkRight() {
        this.list = [1, 2, 3, 4, 5, 6];
        ctx.save();
        ctx.translate(this.pos.x + this.tx, this.pos.y);
        ctx.scale(1, 1);
        ctx.translate(-this.pos.x, -this.pos.y);
        this.tx += 0.7;

        this.drawAnim()
        ctx.restore();
    }

    // taken from lecture slides, slightly modified
    drawAnim() {

        ctx.save()
        ctx.translate(this.pos.x, this.pos.y);
        
        ctx.translate( -this.spriteW / 2, -this.spriteH / 2);

        if (this.index >= this.list.length) {
            this.index = 0;
        }

        ctx.drawImage(this.image, this.list[this.index] * this.spriteW, this.row * this.spriteH, this.spriteW, this.spriteH,
            0, 0, this.spriteW, this.spriteH); //280, 400
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
}