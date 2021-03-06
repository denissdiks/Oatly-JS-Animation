"use strict";

function showFPS() {
  ctx.fillStyle = "black";
  ctx.font = "normal 16pt Arial";
  fps = Math.round(fps);
  ctx.fillText(fps + " fps", 10, 26);
}

function act0() {
  farm.scrollBackground(wood, backgroundSpeed, false);
  if (globalA < 1) {
    globalA += 0.003
  }

  ctx.globalAlpha = globalA;
  cow.drawCowStill();
  calf.draw();

  if (wood.width - wood.pos.x <= cow.spriteW) {
    cow.pos.x += backgroundSpeed;                // smooth appearing of 
    cow.cowsHeadPos.x += backgroundSpeed;        // the cow and
    calf.pos.x += backgroundSpeed;               // the calf on the farm backg

    if (wood.pos.x >= wood.width) {
      actCounter++;   // end of the 1st act
    }
  }
}

function act1() {
  farm.draw();

  if (vehicle.stop) {
    cow.drawCowStill();
    vehicle.driveForward(700);

    sunClockRestart()

    farm.sun.sunClockCount();
    if (farm.sun.sunClock >= 100) {
      actCounter++;
      vehicle.stop = false;
      vehicle.restoreEase();
      farm.sun.sunClock = 0;
    }

  } else {
    cow.drawCowHeadMove(0);

    farm.sun.sunClockCount();
    if (farm.sun.sunClock >= 200) {
      vehicle.driveForward(700);
    }
  }
  calf.draw();
}

function act2() {
  farm.draw();

  if (vehicle.tx > -300) {
    cow.drawCowHeadMove(0);
  } else {
    cow.drawCowStill();
  }

  calf.draw();
  vehicle.driveBack(0);

  if (vehicle.stop) {
    vehicle.stop = false;
    vehicle.Flip = true;
    vehicle.spray = new Spray(200);
    vehicle.spray.init(180, 200);   // new spray angle, because image is flipped
    vehicle.tx = 1;
    vehicle.restoreEase();
    actCounter++;
  }
}

function act3() {
  farm.draw();

  if (vehicle.stop) {
    cow.drawCowHeadMove(1);

    farm.sun.restartSunClock = true;

    calf.imag1stScene.src = calf.img1stSceneSrc2; // next act calf is gonna look different way
    calf.draw();
    actCounter++;
  } else {

    if (vehicle.tx <= -450) {
      cow.drawCowSuspicious()
    } else {
      cow.drawCowHeadMove(0);
    }

  }

  farm.sun.sunClockCount();
  if (farm.sun.sunClock >= 200) { //delay for the truck to come back
    vehicle.driveForward(700);
  }

  calf.draw();
}

function act4() {

  farm.draw();
  cow.drawCowHeadMove(1);
  calf.draw();

  sunClockRestart()

  farm.sun.sunClockCount();
  if (farm.sun.sunClock >= 300) {

    vehicle.image.src = vehicle.imgNoDriverTruck; // farmer is gonna get out from a truck
    farm.sun.restartSunClock = true;
    actCounter++;
  }

  vehicle.driveForward(700);

}

function act5() {
  farm.draw();
  cow.drawCowHeadMove(1);
  calf.draw();
  vehicle.driveForward(700);

  sunClockRestart()

  farm.sun.sunClockCount();
  if (farm.sun.sunClock <= 100) {
    farmer.row = 0;
    farmer.idle();
    //farm.sun.restartSunClock = true;
    //actCounter++;
  } else {
    if (farmer.tx > -520) {
      farmer.walkLeft()
    } else {
      farmer.idle();
      farm.sun.restartSunClock = true;
      actCounter++;
    }
  }

}

function act6() {
  farm.draw();

  farm.sun.sunClockCount();
  if (farm.sun.sunClock >= 100) {

    if (calf.pos.y > 250) {
      farmer.row = 1;     // farmer turns around
      calf.pos.y -= 0.5;

    } else {
      actCounter++;
      farm.sun.restartSunClock = true;
    }
    cow.drawCowScared();
  } else {
    cow.drawCowHeadMove(1);
  }
  calf.draw();
  vehicle.driveForward(700);
  farmer.idle();

  sunClockRestart()
}

function act7() {
  farm.draw();

  sunClockRestart();

  if (farmer.tx < -200) {
    cow.drawCowScared();
    calf.draw();
    vehicle.driveForward(700);
    farmer.walkRight();
    calf.pos.x += 0.7;
  } else {

    farm.sun.sunClockCount();
    if (farm.sun.sunClock >= 100) {
      farmer.row = 0;
      cow.drawCowHeadMove(2);
      calf.draw();
      vehicle.driveForward(700);
      farmer.idle();
    } else {
      actCounter++;
      farm.sun.restartSunClock = true;
    }

  }
}

function act8() {

  farmer.row = 0;
  farm.draw();

  sunClockRestart();

  if (farmer.tx < 0) {
    cow.drawCowHeadMove(2);
    calf.draw();
    vehicle.driveForward(700);
    farmer.walkRight();
  } else {

    cow.drawCowHeadMove(2);
    calf.draw();
    vehicle.driveForward(700);

    farm.sun.sunClockCount();
    if (farm.sun.sunClock >= 100) {
      vehicle.image.src = vehicle.imgDriverTruck; // farmer gets into the car
      vehicle.driveForward(700);

      if (farm.sun.sunClock >= 200) {
        actCounter++;
        farm.sun.restartSunClock = true;
      }

    } else {
      farmer.idle();
    }
  }

}

function act9() {

  farm.sun.sunClockCount();
  if (farm.sun.sunClock >= 150) {

    if (farm.pos.x <= 0) {
      wood.draw();
      if (cow.tx < 400) {
        cow.tx++;
      }

    } else {
      farm.scrollBackground(wood, backgroundSpeed, true);
      cow.tx += 0.05;
    }

  } else {
    farm.draw();
  }

  if (cow.tx < 400) {

    cow.run()
  } else {
    if (globalA >= 0) {
      globalA -= 0.003;
    } else {
      actCounter++;
      farm.sun.restartSunClock = true;
    }
    ctx.globalAlpha = globalA;
    cow.drawCowScared()
  }

  //cow.drawCowHeadMove(3);
  vehicle.stop = false;
  calf.draw()
  vehicle.driveBack(-100);
  calf.pos.x += vehicle.speed;
}

function act10() {
  ctx.globalAlpha = 1;
  sunClockRestart();
  farm.sun.sunClockCount();
  if (farm.sun.sunClock > 300) {
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2 - 50);
    ctx.scale(oatlyScale, oatlyScale);
    ctx.translate(-273 / 2, -516 / 2);
    ctx.drawImage(oatlyImage, 0, 0);
    ctx.restore();

    if (oatlyScale <= 0.9) {
      if (oatlyScale <= 0.6) {
        oatlyScale += 0.01;
      } else {
        oatlyScale += 0.0005;
      }

    } else {
      farm.sun.restartSunClock = true;
      actCounter++;
    }

  }
}

function act11() {

  ctx.save();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2 - 50);
  ctx.scale(oatlyScale, oatlyScale);
  ctx.translate(-273 / 2, -516 / 2);
  ctx.drawImage(oatlyImage, 0, 0);
  ctx.restore();


  ctx.save()
  ctx.font = "50px 'Brush Script MT'";
  ctx.fillText('Choose Plant-Based', 80, 200);
  ctx.fillText('Alternatives', 150, 250);
  ctx.fillText('Choose', 680, 200);
  ctx.fillText('Compassion', 750, 250);
  ctx.restore();

  sunClockRestart();

  farm.sun.sunClockCount();
  if (farm.sun.sunClock > 500) {
    actCounter++;
  }
}


function act12() {

  calf.drawAnim();
}

function sunClockRestart() {
  if (farm.sun.restartSunClock) {
    farm.sun.sunClock = 0;
    farm.sun.restartSunClock = false;
  }
}


function loop(timestamp) {

  let delta = (timestamp - lastRender)
  now = window.performance.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {


    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    switch (actCounter) {
      case 0:
        act0();
        break;
      case 1:
        act1();
        break;
      case 2:
        act2();
        break;
      case 3:
        act3();
        break;
      case 4:
        act4();
        break;
      case 5:
        act5();
        break;
      case 6:
        act6();
        break;
      case 7:
        act7();
        break;
      case 8:
        act8();
        break;
      case 9:
        act9();
        break;
      case 10:
        act10();
        break;
      case 11:
        act11();
        break;
      case 12:
        act12();
        break;
    }


    then = now - (elapsed % fpsInterval);
    fps = 1000 / delta

    lastRender = timestamp;

  }

  //showFPS();
  window.requestAnimationFrame(loop)
}

let fpsInterval, startTime, now, then, elapsed;
function startLoop(fps) {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  loop();
}


/****************MAIN****************/
let ctx = document.querySelector("canvas").getContext("2d");

let backgroundSpeed = 1;
let backgroundScrolling = true;
let globalA = 0;

let farm = new FarmBackground("./images/background1.png", [0, 0], ctx.canvas.width, ctx.canvas.height);
let wood = new FarmBackground("./images/background2.png", [0, 0], ctx.canvas.width, ctx.canvas.height);

let vehicle = new Vehicle([1100, 270], 2);

let farmer = new Farmer("./images/farmer/farmerSpriteC2.png", new Vector(790, 410), 6, 280, 400, 25);
farmer.flipY = false;
let cow = new CowSprite("./images/cow/cowSprite1.png", new Vector(-330, 230), 6, 330, 269, 15);

let calf = new Calf("./images/calfSprites.png", new Vector(-220, 325), 3, 445, 480, 80); // position is relative to the cow
let radius = 500;  // for the last scene
// new Vector(-220, 325), 1, 200, 180, 10

let oatlyImage = document.createElement("img");
oatlyImage.src = "./images/oatly.png";
let oatlyScale = 0.1;


let toRadians = Math.PI / 180;

let fps, lastRender;
let actCounter = 0;
let sceneLength = 200;

startLoop(140);




