width = 250;
height = 500;
blocks = [];
game = true;
over = false;
rand = Math.random();
high_score = 0;
score=0;
window.onload = function () {
   canvas = document.getElementById ("myCanvas");
   ctx = canvas.getContext ("2d");
   time = 20;
	setInterval (Fixed_Update, time);
  ctx.beginPath ();
  for (i = 0; i < 500; i += 25)
      {
      ctx.moveTo(0, i);
      ctx.lineTo(250, i);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
     }
  for (i = 0; i <250; i += 25)
      {
      ctx.moveTo(i, 0);
      ctx.lineTo(i,canvas.height);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
     }
  ctx.closePath ();
  n=0;
  temp = 0;
  generate();
  s =0;
  row=[];
  pass=new Array(20);
  for(i=0; i<20; ++i){row[i]=10;}
  for(i=0; i<20; ++i){
    pass[i] = new Array(10);
    for(j=0; j<10; ++j){
    pass[i][j] = true;
    }
  }
  document.addEventListener ("keydown", function(evt) {
		var key = evt.keyCode;
    if(key ==82){
      for(i=0; i<n;++i){
        blocks[i].r=false;
      }
      n=0;
      over = false;
      game = true;
      for(i=0; i<20; ++i){row[i]=10;}
      for(i=0; i<20; ++i){
        for(j=0; j<10; ++j){
        pass[i][j] = true;
        }
      }
      score=0;
      generate();
    }
    keyPressed(key);
	})
  canvas.addEventListener ("mousedown", function (evt) {
			Cal_Mouse_Pos (evt);
	});
  document.addEventListener ("keyup", function(evt) {
		var key = evt.keyCode;
      if(key == 40 && game){
      for(i=n-temp; i<n; ++i){
        blocks[i].ySpeed = 0.5;
      }
    }
	})
}

function Fixed_Update () {
  ctx.clearRect(0,0,400,500);
  ctx.fillStyle = "#fff0f5";
  ctx.fillRect(250, 0, 150, 500);
  ctx.font = "23px Impact";
  ctx.fillStyle = "#800080";
  ctx.fillText("Score"+": "+score, 255, 50);
  if(high_score<score){
    high_score=score;
  }
  ctx.fillText("High Score"+": "+high_score, 255, 100);
  ctx.fillStyle = "#ff0000";
  ctx.fillText("Instructions: ", 255, 175);
  ctx.font = "15px Impact";
  ctx.fillText("-Down arrow to", 252, 205);
  ctx.fillText("accelerate", 315, 220);
  ctx.fillText("-Up arrow to flip", 252, 255);
  ctx.fillText("-Space to pause", 252, 280);
  ctx.fillText("-r to restart", 252, 305);
  ctx.font = "23px Impact";
  ctx.fillStyle = "#000000";
  ctx.fillText("Next Piece:", 270, 370);
  print_next();
   if(game){
   if(check()){
     ctx.beginPath ();
     for (i = 0; i < 500; i += 25){
         ctx.moveTo(0, i);
         ctx.lineTo(250, i);
         ctx.strokeStyle = '#ffffff';
         ctx.stroke();
        }
     for (i = 0; i <250; i += 25){
         ctx.moveTo(i, 0);
         ctx.lineTo(i,canvas.height);
         ctx.strokeStyle = '#ffffff';
         ctx.stroke();
        }
    ctx.closePath ();
   for(i=0; i<n; ++i){
     blocks[i].display();
     blocks[i].update();
   }
   for(i=n-temp; i<n; ++i){
     DO = true;
     if(Math.floor(blocks[i].y/25)*25==475){DO=false;
     } else if (!pass[Math.floor(blocks[i].y/25+1)][Math.floor(blocks[i].x/25)])     {DO=false;}
     if(!DO){
       for(j=n-temp;j<n;++j){
         blocks[j].stp();
         pass[Math.floor(blocks[j].y/25)][Math.floor(blocks[j].x/25)]=false;
     }
       for(j=n-temp;j<n;++j){
         --row[blocks[j].y/25];
     }
       generate();
       break;
   }
   }
     // score();
   }
   } else if(!game){
     ctx.beginPath ();
     ctx.clearRect(0,0,250,500);
     ctx.font = "40px Arial";
     ctx.fillStyle = "rgb(51, 204, 255)";
     ctx.fillText("Paused", 55, 250);
     ctx.closePath ();
   }
   if(check() == false){
     ctx.beginPath ();
     ctx.font = "40px Arial";
     ctx.fillStyle = "#ffffff";
     ctx.fillText("Game Over", 20, 230);
     Image();
     over = true;
     ctx.closePath ();
   }
}

function generate(){
  if(rand<0.1){
    blocks[n+0] = new block(125,0);
    blocks[n+1] = new block(125,25);
    blocks[n+2] = new block(150,0);
    blocks[n+3] = new block(150,25);
    colour = Math.random();
    for(i=n; i<n+4; ++i){ blocks[i].colour = colour;}
    blocks[n+0].id = 1;
    blocks[n+0].state = 1;
    temp = 4;
    n +=4;
  } else if(rand<0.3) {
    blocks[n+0] = new block(75,0);
    blocks[n+1] = new block(100,0);
    blocks[n+2] = new block(125,0);
    blocks[n+3] = new block(150,0);
    colour = Math.random();
    for(i=n; i<n+4; ++i){ blocks[i].colour = colour;}
    blocks[n+0].id = 2;
    blocks[n+0].state = 1;
    temp = 4;
    n +=4;
  } else if(rand<0.4 ){
    blocks[n+0] = new block(150,0);
    blocks[n+1] = new block(100,25);
    blocks[n+2] = new block(125,25);
    blocks[n+3] = new block(150,25);
    colour = Math.random();
    for(i=n; i<n+4; ++i){ blocks[i].colour = colour;}
    blocks[n+0].id = 3;
    blocks[n+0].state = 1;
    temp = 4;
    n +=4;
  } else if(rand<0.5){
    blocks[n+0] = new block(100,0);
    blocks[n+1] = new block(100,25);
    blocks[n+2] = new block(125,25);
    blocks[n+3] = new block(150,25);
    colour = Math.random();
    for(i=n; i<n+4; ++i){ blocks[i].colour = colour;}
    blocks[n+0].id = 4;
    blocks[n+0].state = 1;
    temp = 4;
    n +=4;
  } else if(rand<0.6){
    blocks[n+0] = new block(175,0);
    blocks[n+1] = new block(125,25);
    blocks[n+2] = new block(150,25);
    blocks[n+3] = new block(150,0);
    colour = Math.random();
    for(i=n; i<n+4; ++i){ blocks[i].colour = colour;}
    blocks[n+0].id = 5;
    blocks[n+0].state = 1;
    temp = 4;
    n +=4;
  } else if(rand<0.8){
    blocks[n+0] = new block(100,0);
    blocks[n+1] = new block(125,0);
    blocks[n+2] = new block(125,25);
    blocks[n+3] = new block(150,25);
    colour = Math.random();
    for(i=n; i<n+4; ++i){ blocks[i].colour = colour;}
    blocks[n+0].id = 6;
    blocks[n+0].state = 1;
    temp = 4;
    n +=4;
  } else {
    blocks[n+0] = new block(125,0);
    blocks[n+1] = new block(125,25);
    blocks[n+2] = new block(100,25);
    blocks[n+3] = new block(150,25);
    colour = Math.random();
    for(i=n; i<n+4; ++i){ blocks[i].colour = colour;}
    blocks[n+0].id = 7;
    blocks[n+0].state = 1;
    temp = 4;
    n +=4;
  }
  score+=4;
  rand = Math.random();
}

function check(){
    for(i=0; i<20; ++i){
      if(row[i] == 0){
        for(j=0; j<n; ++j){
          if(blocks[j].y/25 == i && blocks[j].r ==true){
            blocks[j].r = false;
          } else if(blocks[j].y/25 < i && blocks[j].r ==true) {
            blocks[j].y +=25;
          }
        }
          for(f=i; f>0;--f){row[f]=row[f-1];}
          for(k=i;k>0;--k){
            for(j=0; j<10; ++j){
              pass[k][j]=pass[k-1][j];
            }
          }
      }
    }
  for(i=0; i<10; ++i){
    if(pass[0][i]==false){
    return false;
    }
  }
  return true;
}

function keyPressed(keyCode) {
    if(keyCode == 32){
      if(over == false){
      for(i=n-temp; i<n; ++i){
        if(blocks[i].ySpeed != 0){
          blocks[i].ySpeed = 0;
          game = false;
        } else {
          blocks[i].ySpeed = 0.5;
          game = true;
        }
      }
    } else if(over){
       // Image();
    }
    } else if (keyCode == 39 && game){
      Do = true;
      for(i=n-temp; i<n; ++i){
        if(blocks[i].x>=225){Do = false;}
        if(Do == true && pass[Math.floor(blocks[i].y/25)][Math.floor(blocks[i].x/25)+1] == false){Do=false;}
      }
      for(i=n-temp; i<n; ++i){
        if(Do == true){
          blocks[i].x+=25;
        }

      }
    } else if (keyCode == 37 && game){
      Do = true;
      for(i=n-temp; i<n; ++i){
        if(blocks[i].x <= 0){Do = false;}
        if(Do == true && pass[Math.floor(blocks[i].y/25)][Math.floor(blocks[i].x/25)-1] == false){Do=false;}
      }
      for(i=n-temp; i<n; ++i){
        if(Do == true){
          blocks[i].x-=25;
        }
      }
    } else if(keyCode == 40 && game){
        for(i=n-temp; i<n; ++i){
          blocks[i].ySpeed = 1.5;
      }
    } else if(keyCode == 38 && game){flip();
    }
}

function flip(){
    if(blocks[n-temp].id == 1){
      //do not do anything
    } else if(blocks[n-temp].id == 2) {
      if(blocks[n-temp].state == 1){
        Space = true;
        if(Math.floor(blocks[n-temp].y/25)+3>=20){
            Space = false;
        } else {
        Space = pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)+2][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)+3][Math.floor(blocks[n-temp].x/25)];
        }
        if(Space){
        blocks[n-temp].state = 2;
        for(i=n-temp+1;i<n; ++i){
          blocks[i].x = blocks[n-temp].x;
          blocks[i].y = blocks[n-temp].y + (i-(n-temp))*25;
        }
      }
      } else if(blocks[n-temp].state == 2){
        Space = true;
        if(Math.floor(blocks[n-temp].x/25)+3>=10){
            Space = false;
        } else {
        Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)+2] && pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)+3];
        }
        if(Space){
        blocks[n-temp].state = 1;
        for(i=n-temp+1;i<n; ++i){
          blocks[i].y = blocks[n-temp].y;
          blocks[i].x = blocks[n-temp].x + (i-(n-temp))*25;
        }
        }
      }
    } else if(blocks[n-temp].id == 3) {
      if(blocks[n-temp].state == 1){
        Space = true;
        if(Math.floor(blocks[n-temp].y/25)-2<0){Space=false;} else{
        Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)-2][Math.floor(blocks[n-temp].x/25)-1];
        }
        if(Space){
          blocks[n-temp].state = 2;
          blocks[n-temp+1].x = blocks[n-temp].x-25;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x-25;
          blocks[n-temp+1].y = blocks[n-temp].y-50;
          blocks[n-temp+2].y = blocks[n-temp].y-25;
          blocks[n-temp+3].y = blocks[n-temp].y;
        }
      } else if(blocks[n-temp].state == 2){
        Space = true;
        if(Math.floor(blocks[n-temp].x/25)+2 >=10){
          Space = false;
        }else{
          Space = pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)+2];
          }
        if(Space){
          blocks[n-temp].state = 3;
          blocks[n-temp+3].x = blocks[n-temp].x;
          blocks[n-temp+2].x = blocks[n-temp].x+25;
          blocks[n-temp+1].x = blocks[n-temp].x+50;
          blocks[n-temp+1].y = blocks[n-temp].y-25;
          blocks[n-temp+2].y = blocks[n-temp].y-25;
          blocks[n-temp+3].y = blocks[n-temp].y-25;
        }
      } else if(blocks[n-temp].state == 3){
        Space = true;
        if(blocks[n-temp].y+50>500){Space=false;
        } else{
          Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)+2][Math.floor(blocks[n-temp].x/25)+1];
        }
        if(Space){
          blocks[n-temp].state = 4;
          blocks[n-temp+3].x = blocks[n-temp].x+25;
          blocks[n-temp+2].x = blocks[n-temp].x+25;
          blocks[n-temp+1].x = blocks[n-temp].x+25;
          blocks[n-temp+1].y = blocks[n-temp].y+50;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y;
        }
      } else {
        Space = true;
        if((Math.floor(blocks[n-temp].x/25)-2 <0)){Space=false;
          } else {
          Space = pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-2] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)];
          }
        if(Space){
          blocks[n-temp].state = 1;
          blocks[n-temp+3].x = blocks[n-temp].x;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+1].x = blocks[n-temp].x-50;
          blocks[n-temp+1].y = blocks[n-temp].y+25;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y+25;
        }
      }
    } else if(blocks[n-temp].id == 4) {
      if(blocks[n-temp].state == 1){
        Space = true;
        if(Math.floor(blocks[n-temp].y/25)+2>=20 || Math.floor(blocks[n-temp].x/25)-1<0){Space=false;} else{
        Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)+2][Math.floor(blocks[n-temp].x/25)-1];
        }
        if(Space){
          blocks[n-temp].state = 2;
          blocks[n-temp+1].x = blocks[n-temp].x-25;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x-25;
          blocks[n-temp+1].y = blocks[n-temp].y;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y+50;
        }
      } else if(blocks[n-temp].state == 2){
        Space = true;
        if(Math.floor(blocks[n-temp].x/25)-2 <0 ||Math.floor(blocks[n-temp].y/25)-1 <0){
          Space = false;
        }else{
          Space = pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)-2];
          }
        if(Space){
          blocks[n-temp].state = 3;
          blocks[n-temp+1].x = blocks[n-temp].x;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x-50;
          blocks[n-temp+1].y = blocks[n-temp].y-25;
          blocks[n-temp+2].y = blocks[n-temp].y-25;
          blocks[n-temp+3].y = blocks[n-temp].y-25;
        }
      } else if(blocks[n-temp].state == 3){
        Space = true;
        if(Math.floor(blocks[n-temp].y/25)-2<0 || Math.floor(blocks[n-temp].x/25)+1>=10){Space=false;
        } else{
          Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)-2][Math.floor(blocks[n-temp].x/25)+1];
        }
        if(Space){
          blocks[n-temp].state = 4;
          blocks[n-temp+3].x = blocks[n-temp].x+25;
          blocks[n-temp+2].x = blocks[n-temp].x+25;
          blocks[n-temp+1].x = blocks[n-temp].x+25;
          blocks[n-temp+1].y = blocks[n-temp].y;
          blocks[n-temp+2].y = blocks[n-temp].y-25;
          blocks[n-temp+3].y = blocks[n-temp].y-50;
        }
      } else {
        Space = true;
        if((Math.floor(blocks[n-temp].x/25)+2 >=10) || Math.floor(blocks[n-temp].y/25)+1>=20){Space=false;
          } else {
          Space = pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)+2];
          }
        if(Space){
          blocks[n-temp].state = 1;
          blocks[n-temp+1].x = blocks[n-temp].x;
          blocks[n-temp+2].x = blocks[n-temp].x+25;
          blocks[n-temp+3].x = blocks[n-temp].x+50;
          blocks[n-temp+1].y = blocks[n-temp].y+25;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y+25;
        }
      }
    } else if(blocks[n-temp].id == 5) {
      if(blocks[n-temp].state == 1){
        Space = true;
        if(Math.floor(blocks[n-temp].y/25)-2<0){
            Space = false;
        } else {
        Space = pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)-2][Math.floor(blocks[n-temp].x/25)-1];
        }
        if(Space){
        blocks[n-temp].state = 2;
          blocks[n-temp+1].x = blocks[n-temp].x-25;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x;
          blocks[n-temp+1].y = blocks[n-temp].y-50;
          blocks[n-temp+2].y = blocks[n-temp].y-25;
          blocks[n-temp+3].y = blocks[n-temp].y-25;
      }
      } else if(blocks[n-temp].state == 2){
        Space = true;
        if(Math.floor(blocks[n-temp].x/25)-2<0){
            Space = false;
        } else {
        Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-2];
        }
        if(Space){
        blocks[n-temp].state = 1;
          blocks[n-temp+1].x = blocks[n-temp].x-50;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x-25;
          blocks[n-temp+1].y = blocks[n-temp].y+25;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y;
        }
      }
    } else if(blocks[n-temp].id == 6) {
        if(blocks[n-temp].state == 1){
          Space = true;
          if(Math.floor(blocks[n-temp].y/25)+2>=20||Math.floor(blocks[n-temp].x/25)-1<0){
              Space = false;
        } else {
          Space = pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)+2][Math.floor(blocks[n-temp].x/25)-1];
        }
        if(Space){
        blocks[n-temp].state = 2;
          blocks[n-temp+1].x = blocks[n-temp].x;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x-25;
          blocks[n-temp+1].y = blocks[n-temp].y+25;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y+50;
      }
      } else if(blocks[n-temp].state == 2){
        Space = true;
        if(Math.floor(blocks[n-temp].x/25)+2>=10){
            Space = false;
        } else {
        Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)+2];
        }
        if(Space){
        blocks[n-temp].state = 1;
          blocks[n-temp+1].x = blocks[n-temp].x+25;
          blocks[n-temp+2].x = blocks[n-temp].x+25;
          blocks[n-temp+3].x = blocks[n-temp].x+50;
          blocks[n-temp+1].y = blocks[n-temp].y;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y+25;
        }
      }
    } else if(blocks[n-temp].id == 7) {
      if(blocks[n-temp].state == 1){
        Space = true;
        if(Math.floor(blocks[n-temp].y/25)-1<0){Space=false;} else{
        Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)-1];
        }
        if(Space){
          blocks[n-temp].state = 2;
          blocks[n-temp+1].x = blocks[n-temp].x-25;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x-25;
          blocks[n-temp+1].y = blocks[n-temp].y;
          blocks[n-temp+2].y = blocks[n-temp].y-25;
          blocks[n-temp+3].y = blocks[n-temp].y+25;
        }
      } else if(blocks[n-temp].state == 2){
        Space = true;
        if(Math.floor(blocks[n-temp].x/25)+1 >=10){
          Space = false;
        }else{
          Space = pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)-1] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)+1];
          }
        if(Space){
          blocks[n-temp].state = 3;
          blocks[n-temp+1].x = blocks[n-temp].x;
          blocks[n-temp+2].x = blocks[n-temp].x+25;
          blocks[n-temp+3].x = blocks[n-temp].x-25;
          blocks[n-temp+1].y = blocks[n-temp].y-25;
          blocks[n-temp+2].y = blocks[n-temp].y-25;
          blocks[n-temp+3].y = blocks[n-temp].y-25;
        }
      } else if(blocks[n-temp].state == 3){
        Space = true;
        if(Math.floor(blocks[n-temp].y/25)+1>=20){Space=false;
        } else{
          Space = pass[Math.floor(blocks[n-temp].y/25)][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)-1][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)+1];
        }
        if(Space){
          blocks[n-temp].state = 4;
          blocks[n-temp+1].x = blocks[n-temp].x+25;
          blocks[n-temp+2].x = blocks[n-temp].x+25;
          blocks[n-temp+3].x = blocks[n-temp].x+25;
          blocks[n-temp+1].y = blocks[n-temp].y;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y-25;
        }
      } else {
        Space = true;
        if((Math.floor(blocks[n-temp].x/25)-1 <0)){Space=false;
          } else {
          Space = pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)+1] && pass[Math.floor(blocks[n-temp].y/25)+1][Math.floor(blocks[n-temp].x/25)-1];
          }
        if(Space){
          blocks[n-temp].state = 1;
          blocks[n-temp+1].x = blocks[n-temp].x;
          blocks[n-temp+2].x = blocks[n-temp].x-25;
          blocks[n-temp+3].x = blocks[n-temp].x+25;
          blocks[n-temp+1].y = blocks[n-temp].y+25;
          blocks[n-temp+2].y = blocks[n-temp].y+25;
          blocks[n-temp+3].y = blocks[n-temp].y+25;
        }
      }
    } else {
    }
}

function Cal_Mouse_Pos (evt) {
    var rect = canvas.getBoundingClientRect ();
    var root = document.documentElement;
    mouse_pos_x = evt.clientX - rect.left - root.scrollLeft;
    mouse_pos_y = evt.clientY - rect.top - root.scrollTop;
    // console.log ("MousePos: " + mouse_pos_x + ", " + mouse_pos_y);
    if(over && mouse_pos_x >= 110 && mouse_pos_x<=130 && mouse_pos_y>=250 && mouse_pos_y<=270){
      // console.log ("Pressed ");
      for(i=0; i<n;++i){
        blocks[i].r=false;
      }
      n=0;
      over = false;
      game = true;
      for(i=0; i<20; ++i){row[i]=10;}
      for(i=0; i<20; ++i){
        for(j=0; j<10; ++j){
        pass[i][j] = true;
        }
      }
      score=0;
      generate();
    }
}

function Image() {
    var img = document.getElementById("image");
    // var img = new Image();
    // img.src = "restart.png";
    ctx.drawImage(img, 110, 250);
}

function print_next(){
  if(rand<0.1){
    ctx.beginPath ();
    ctx.fillStyle = "#000000";
    ctx.fillRect(270, 400, 29, 29);
    ctx.fillRect(300, 400, 29, 29);
    ctx.fillRect(300, 430, 29, 29);
    ctx.fillRect(270, 430, 29, 29);
    ctx.closePath();
  } else if(rand<0.3) {
    ctx.beginPath ();
    ctx.fillStyle = "#000000";
    ctx.fillRect(270, 400, 29, 29);
    ctx.fillRect(300, 400, 29, 29);
    ctx.fillRect(330, 400, 29, 29);
    ctx.fillRect(360, 400, 29, 29);
    ctx.closePath();
  } else if(rand<0.4 ){
    ctx.beginPath ();
    ctx.fillStyle = "#000000";
    ctx.fillRect(270, 430, 29, 29);
    ctx.fillRect(300, 430, 29, 29);
    ctx.fillRect(330, 430, 29, 29);
    ctx.fillRect(330, 400, 29, 29);
    ctx.closePath();
  } else if(rand<0.5){
    ctx.beginPath ();
    ctx.fillStyle = "#000000";
    ctx.fillRect(270, 400, 29, 29);
    ctx.fillRect(270, 430, 29, 29);
    ctx.fillRect(300, 430, 29, 29);
    ctx.fillRect(330, 430, 29, 29);
    ctx.closePath();
  } else if(rand<0.6){
    ctx.beginPath ();
    ctx.fillStyle = "#000000";
    ctx.fillRect(300, 430, 29, 29);
    ctx.fillRect(330, 430, 29, 29);
    ctx.fillRect(330, 400, 29, 29);
    ctx.fillRect(360, 400, 29, 29);
    ctx.closePath();
  } else if(rand<0.8){
    ctx.beginPath ();
    ctx.fillStyle = "#000000";
    ctx.fillRect(270, 400, 29, 29);
    ctx.fillRect(300, 400, 29, 29);
    ctx.fillRect(300, 430, 29, 29);
    ctx.fillRect(330, 430, 29, 29);
    ctx.closePath();
  } else {
    ctx.beginPath ();
    ctx.fillStyle = "#000000";
    ctx.fillRect(330, 400, 29, 29);
    ctx.fillRect(330, 430, 29, 29);
    ctx.fillRect(300, 430, 29, 29);
    ctx.fillRect(360, 430, 29, 29);
    ctx.closePath();
  }
}
