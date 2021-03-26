class Vehicle {

    constructor(pos, speed) {

        this.image = document.createElement("img");
        this.imgDriverTruck = "./images/farmTruckDriver.png";
        this.imgNoDriverTruck = "./images/farmTruck1.png";
        this.image.src = this.imgDriverTruck;
        this.imagePos = new Vector(pos[0], pos[1]);

        this.toRadians = Math.PI / 180;
        this.tx = 1;
        this.rx = 0; //for wheels to rotate
        this.color = ''; // wheels color

        this.Flip = false;

        this.firstWheelFlipX = 155;  // wheels' position 
        this.secondWheelFlipX = 476; // Flip version
        this.firstWheelX = 126;  // wheels' position 
        this.secondWheelX = 447; // relatively to    
        this.wheelsY = 210;      // body of the car

        this.groundY = this.imagePos.y + this.wheelsY;
        this.path = 0;
        this.stop = false;

        this.startPos = this.imagePos.x;
        this.segSize = 45;

        this.speed = speed;
        this.ease = 0;

        this.spray = new Spray(200);
        this.spray.init(360, 340);
    }

    updateEase() {
        this.ease += 0.01;
    }

    restoreEase() {
        this.ease = 0.02;
    }

    driveForward(destination) {  // for act 1

        this.drawTruck();
        //this.addSmoke();

        if (Math.abs(this.tx) >= destination) {
            this.stop = true;
        }

        if (!this.stop) {

            if (destination - Math.abs(this.tx) < this.speed * 100 - 35) {

                if (this.speed <= this.ease) {
                    this.ease -= 0.1;
                } else {
                    this.updateEase();
                }

            } else {
                this.ease = 0;
            }

            this.tx -= this.speed - this.ease;
            this.rx += (-0.8 + this.ease / 10) * toRadians;

            this.addSmoke();
        }
    }

    changedEase() {
        return this.ease += 0.01;
    }

    driveBack(destination) {
        this.drawTruck();


        if (this.tx >= -destination) {
            this.stop = true;
            //this.tx = 1;
        }

        if (!this.stop) {

            if (destination + Math.abs(this.tx) > Math.abs(this.tx) - 50) {
                this.tx += this.ease;
                this.rx += 1 * toRadians;

                this.updateEase();
            } else {
                this.tx += this.speed;
                this.rx += 1 * toRadians;
            }

        }

        this.addSmoke();

    }

    addSmoke() {
        if (this.Flip) {

            this.spray.update(this.startPos + this.tx + 30, 180, 200);
        } else {

            this.spray.update(this.startPos + this.tx + 570, 360, 340);
        }

        this.spray.draw();
    }

    drawTruck() {

        let firstWheelPos;
        let secondwhelPos;

        if (this.Flip) {
            firstWheelPos = this.firstWheelFlipX;
            secondwhelPos = this.secondWheelFlipX;
        } else {
            firstWheelPos = this.firstWheelX;
            secondwhelPos = this.secondWheelX;
        }

        //wheel 1
        ctx.save();

        ctx.translate(firstWheelPos + this.tx + this.startPos, this.groundY, 0);
        ctx.rotate(this.rx);
        ctx.translate(-firstWheelPos - this.startPos, -this.groundY, 0);

        this.drawWheel(firstWheelPos + this.startPos, this.groundY);

        ctx.restore();

        //wheel 2
        ctx.save();

        ctx.translate(secondwhelPos + this.tx + this.startPos, this.groundY, 0);
        ctx.rotate(this.rx);
        ctx.translate(-secondwhelPos - this.startPos, -this.groundY, 0);

        this.drawWheel(secondwhelPos + this.startPos, this.groundY);
        ctx.restore();

        //vehicle body
        ctx.save();

        if (this.Flip) {
            ctx.translate(((this.startPos + this.tx) * 2 + 605) / 2, 0);
            ctx.scale(-1, 1);
            ctx.translate(((-this.startPos) * 2 - 605) / 2, 0);
        } else {
            ctx.translate(this.tx, 0)
        }

        this.drawBody(0 + this.startPos);  // 605, 296

        ctx.restore();

    }

    drawWheel(posX, posY) {

        ctx.beginPath();
        ctx.arc(posX, posY, 40, 0 * toRadians, 360 * toRadians);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();

        for (let index = 1; index <= 360 / this.segSize; index++) {
            if (index % 2) {
                this.color = 'white';
            } else
                this.color = 'darkGrey';

            this.drawSegment(posX, posY, 30, (index - 1) * 45 * toRadians, index * 45 * toRadians, this.color);
        }

        ctx.beginPath();
        ctx.arc(posX, posY, 10, 0 * toRadians, 360 * toRadians);
        ctx.fillStyle = 'darkgrey';
        ctx.fill();
        ctx.stroke();
    }

    drawSegment(posX, posY, rad, from, to, color) {
        ctx.beginPath();
        ctx.lineTo(posX, posY);
        ctx.arc(posX, posY, rad, from, to);
        ctx.lineTo(posX, posY);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    }

    drawBody(xoff) {
        ctx.drawImage(this.image, xoff, this.imagePos.y);
    }


}