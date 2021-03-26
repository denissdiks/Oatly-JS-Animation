class Sprite {
    constructor(name, pos, frames, spriteWidth, spriteHeight, delay) {
      this.image = document.createElement("img");
      this.image.src = name;
      this.frames = frames; // number of images in sprite sheet
      this.pos = pos;
      this.spriteW = spriteWidth;
      this.spriteH = spriteHeight;
      this.scale = 1;
      this.flipY=false;
      this.rotate = 0;
      this.transparency = 1;
      this.index = 0; //the index of the current sprite (a number between 0-(frames-1), ignoring rows and columns)
      this.sheetRows = 1; // the number of rows in the sheet
      this.sheetCols = frames;// the number of columns in the sheet
      this.col = 0; // the current column be used
      this.row = 0;// the current column be used
      this.animDelay = delay; // the number of frames to display an individual image for
      this.count = 0;
    }
    draw() {
      ctx.save();
      // ctx.globalAlpha = this.transparency;
      // ctx.translate(this.pos.x, this.pos.y);
      // ctx.rotate(this.rotate);
      if(this.flipY){ctx.scale(-this.scale, this.scale);}
      // else{ctx.scale(this.scale, this.scale);}
      // ctx.translate(-this.spriteW / 2, -this.spriteH / 2);
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.spriteW, this.spriteH);
      ctx.restore();
    }
  
    drawAnim(){
      ctx.save()
      ctx.translate(this.pos.x,this.pos.y);
      ctx.rotate(this.rotate);   
      if (this.flipY){
        if(this.flipY){ctx.scale(-this.scale, this.scale);}
      } else {
        ctx.scale(this.scale,this.scale);
      }
      
      ctx.translate(-this.spriteW/2,-this.spriteH/2);   
      
      this.col=this.index%this.sheetCols;
      this.row=Math.trunc(this.index/this.sheetCols);
      ctx.drawImage(this.image,this.col*this.spriteW, this.row*this.spriteH, this.spriteW, this.spriteH, 0,0, this.spriteW, this.spriteH);
      ctx.restore()
      this.count+=1;
      if (this.count%this.animDelay==0){    
        this.count=0;
        this.index+=1;
        this.index=this.index%this.frames; 
      }
      let tmp=0;
    }
  }