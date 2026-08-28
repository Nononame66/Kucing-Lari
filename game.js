const canvas=document.getElementById("gameCanvas"),ctx=canvas.getContext("2d");
const $=id=>document.getElementById(id);
const GRID=50,HIVE_EVERY=15,START_ROWS=24;
let W=0,H=0,COLS=0,rows=[],player=null,cameraY=0;
let score=0,level=1,gameState="menu",highScore=Number(localStorage.getItem("lebahLariHighScore")||0);
$("highscore").textContent=highScore;

function resize(){const r=canvas.getBoundingClientRect();canvas.width=Math.max(320,Math.floor(r.width*devicePixelRatio));canvas.height=Math.max(480,Math.floor(r.height*devicePixelRatio));ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);W=r.width;H=r.height;COLS=Math.max(5,Math.floor(W/GRID));}
window.addEventListener("resize",resize); resize();

const rand=(a,b)=>Math.random()*(b-a)+a;
const choice=a=>a[Math.floor(Math.random()*a.length)];

class Bee{
  constructor(){this.reset()}
  reset(){this.gridX=Math.floor(COLS/2);this.gridY=2;this.x=this.gridX*GRID+5;this.y=H-(this.gridY*GRID)+5;this.w=40;this.h=40;this.wave=0;this.jump=0}
  update(){const tx=this.gridX*GRID+5,ty=H-this.gridY*GRID+5;this.x+=(tx-this.x)*.28;this.y+=(ty-this.y)*.28;this.wave+=.18}
  draw(){const bob=Math.sin(this.wave)*1.5, x=this.x,y=this.y+bob;
    ctx.save();ctx.translate(x+20,y+20);
    ctx.fillStyle="#0003";ctx.beginPath();ctx.ellipse(0,17,17,6,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#ffffffbb";ctx.beginPath();ctx.ellipse(-9,-13,8,13,-.35,0,Math.PI*2);ctx.fill();ctx.strokeStyle="#34495e";ctx.stroke();
    ctx.beginPath();ctx.ellipse(9,-13,8,13,.35,0,Math.PI*2);ctx.fill();ctx.stroke();
    const g=ctx.createRadialGradient(-5,-8,2,0,0,22);g.addColorStop(0,"#fff08a");g.addColorStop(1,"#f39c12");ctx.fillStyle=g;
    ctx.beginPath();ctx.ellipse(0,0,20,15,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle="#283747";ctx.fillRect(-7,-14,5,28);ctx.fillRect(5,-14,5,28);
    ctx.fillStyle="#111";ctx.beginPath();ctx.arc(13,-6,3,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }
}

class Row{
  constructor(y,lvl){
    this.gridY=y;this.y=H-y*GRID;this.flowers=[];
    this.type=(y>2&&(y-2)%HIVE_EVERY===0)?"hive":(Math.random()<.48?"safe":"flower");
    this.speed=(rand(1.0,1.8)*(1+(lvl-1)*.3))*(Math.random()<.5?-1:1);
    if(this.type==="flower"){
      const n=2+Math.floor(Math.random()*3);
      for(let i=0;i<n;i++)this.flowers.push({x:rand(-20,W+20),size:rand(19,24),rot:rand(0,6.28),color:choice(["#ff5263","#9b59b6","#3498db","#f368e0"])});
    }
  }
  update(){if(this.type!=="flower")return;for(const f of this.flowers){f.x+=this.speed;f.rot+=.015;if(f.x>W+45)f.x=-45;if(f.x<-45)f.x=W+45}}
  draw(){
    const y=this.y+cameraY;
    if(y<-GRID||y>H+GRID)return;
    if(this.type==="safe"){ctx.fillStyle="#49a82d";ctx.fillRect(0,y,W,GRID);for(let x=10;x<W;x+=47){ctx.fillStyle="#79c653";ctx.beginPath();ctx.arc(x,y+rand(12,38),2,0,6.28);ctx.fill()}}
    else if(this.type==="hive"){const g=ctx.createLinearGradient(0,y,0,y+GRID);g.addColorStop(0,"#f6c443");g.addColorStop(1,"#d98715");ctx.fillStyle=g;ctx.fillRect(0,y,W,GRID);ctx.fillStyle="#fff7";ctx.font="bold 12px system-ui";ctx.textAlign="center";ctx.fillText("🍯 SARANG CHECKPOINT 🍯",W/2,y+30)}
    else{ctx.fillStyle="#5fbd36";ctx.fillRect(0,y,W,GRID);ctx.fillStyle="#ffffff0b";ctx.fillRect(0,y,W,1);
      for(const f of this.flowers){ctx.save();ctx.translate(f.x,y+25);ctx.rotate(f.rot);ctx.fillStyle=f.color;for(let i=0;i<6;i++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.ellipse(f.size*.55,0,f.size*.5,f.size*.28,0,0,6.28);ctx.fill()}ctx.fillStyle="#ffe66d";ctx.beginPath();ctx.arc(0,0,7,0,6.28);ctx.fill();ctx.restore()}
    }
  }
}

function resetGame(){
  resize();rows=[];score=0;level=1;cameraY=0;player=new Bee();
  for(let i=0;i<START_ROWS;i++){const r=new Row(i,1);if(i<=2){r.type="safe";r.flowers=[]}rows.push(r)}
  updateHud();gameState="playing";hideAll();$("pauseBtn").style.display="block";
}
function updateHud(){$("score").textContent=score;$("level").textContent=level;$("highscore").textContent=highScore}
function hideAll(){$("menu").classList.add("hidden");$("pauseMenu").classList.add("hidden");$("gameOver").classList.add("hidden")}
function move(dir){
  if(gameState==="menu"){resetGame();return}
  if(gameState==="gameover"){resetGame();return}
  if(gameState!=="playing")return;
  if(dir==="up"){player.gridY++;const dist=player.gridY-2;if(dist>score)score=dist;
    const newLevel=Math.floor(Math.max(0,dist)/HIVE_EVERY)+1;
    if(newLevel>level){level=newLevel;score+=5;showToast("🍯 +5 BONUS! LEVEL "+level)}
  }else if(dir==="down"){if(player.gridY>2)player.gridY--}
  else if(dir==="left"){if(player.gridX>0)player.gridX--}
  else if(dir==="right"){if(player.gridX<COLS-1)player.gridX++}
  if(score>highScore){highScore=score;localStorage.setItem("lebahLariHighScore",highScore)}
  updateHud();
}
function collision(){
  const row=rows.find(r=>r.gridY===player.gridY);
  if(!row||row.type!=="flower")return false;
  const px=player.x+20,py=player.y+20;
  return row.flowers.some(f=>Math.hypot(px-f.x,py-(row.y+25))<f.size*.85+13);
}
function endGame(){gameState="gameover";$("finalScore").textContent=score;$("finalLevel").textContent=level;$("finalHigh").textContent=highScore;$("gameOver").classList.remove("hidden");$("pauseBtn").style.display="none"}
let toastUntil=0,toastText="";
function showToast(t){toastText=t;toastUntil=performance.now()+1200}
function drawToast(){if(performance.now()>toastUntil)return;ctx.save();ctx.font="900 20px system-ui";ctx.textAlign="center";ctx.fillStyle="#0009";ctx.fillRect(W/2-120,H*.28-27,240,45);ctx.fillStyle="#fff";ctx.fillText(toastText,W/2,H*.28);ctx.restore()}
function loop(){
  ctx.clearRect(0,0,W,H);
  if(gameState==="playing"){
    const top=rows[rows.length-1]?.gridY||0;if(player.gridY>top-10)for(let i=1;i<=12;i++)rows.push(new Row(top+i,level));
    if(rows.length>55)rows=rows.filter(r=>r.gridY>player.gridY-18);
    const target=(player.gridY*GRID)-H+250;cameraY+=(target-cameraY)*.08;
  }
  for(const r of rows){r.update();r.draw()}
  if(player){player.update();ctx.save();ctx.translate(0,cameraY);player.draw();ctx.restore()}
  if(gameState==="playing"&&collision())endGame();
  drawToast();
  requestAnimationFrame(loop);
}
$("startBtn").onclick=resetGame;$("restartBtn").onclick=resetGame;$("restartPauseBtn").onclick=resetGame;
$("resumeBtn").onclick=()=>{gameState="playing";$("pauseMenu").classList.add("hidden")};
$("pauseBtn").onclick=()=>{if(gameState==="playing"){gameState="paused";$("pauseMenu").classList.remove("hidden")}};
document.querySelectorAll("#touch-controls button").forEach(b=>{b.addEventListener("pointerdown",e=>{e.preventDefault();move(b.dataset.dir)})});
let sx=0,sy=0;
canvas.addEventListener("pointerdown",e=>{sx=e.clientX;sy=e.clientY});
canvas.addEventListener("pointerup",e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<28)return;move(Math.abs(dx)>Math.abs(dy)?(dx>0?"right":"left"):(dy>0?"down":"up"))});
window.addEventListener("keydown",e=>{const k=e.key.toLowerCase();const map={arrowup:"up",w:"up",arrowdown:"down",s:"down",arrowleft:"left",a:"left",arrowright:"right",d:"right"};if(map[k]){e.preventDefault();move(map[k])}else if(k==="p"&&gameState==="playing")$("pauseBtn").click()});
player=new Bee();for(let i=0;i<START_ROWS;i++){const r=new Row(i,1);if(i<=2){r.type="safe";r.flowers=[]}rows.push(r)}
$("pauseBtn").style.display="none";updateHud();loop();
