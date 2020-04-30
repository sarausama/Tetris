class block{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.w = 24;
    this.l = 24;
    this.xSpeed = 0;
    this.ySpeed = 0.5;
    this.r = true;
    this.id = 0;
    this.state = 0;
    this.colour = 0;
  }
  display(){
    if(this.r == true){
      if(this.colour<0.2){
        ctx.fillStyle = "rgb(255, 0, 0)";
      } else if(this.colour<0.4){
        ctx.fillStyle = "rgb(82, 0, 247)";
      } else if(this.colour<0.6){
        ctx.fillStyle = "rgb(174, 136, 203)";
      } else if(this.colour<0.8){
        ctx.fillStyle = "rgb(64, 211, 203)";
      } else {
        ctx.fillStyle = "rgb(64, 219, 87)";
      }
      ctx.fillRect(this.x, this.y, this.w, this.l);
    }
  }
  update(){
    this.x = Math.ceil((this.x + this.xSpeed)/25)*25;
    this.y = this.y + this.ySpeed*2;
  }
  stop(l){
  if(this.y == l){ this.xSpeed=0; this.ySpeed = 0; return true;}
  }
  stp(){this.xSpeed =0; this.ySpeed = 0; this.y=Math.floor(this.y/25)*25;}
}
