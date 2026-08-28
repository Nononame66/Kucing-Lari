const c=document.getElementById("canvas"),x=c.getContext("2d");
const $=id=>document.getElementById(id);
const GRID=50,HIVE=15;
let W,H,COLS,rows=[],bee,score=0,level=1,honey=0,best=+localStorage.getItem("lebahBest")||0,state="menu",camera=0;
let selected=localStorage.getItem("lebahSkin")||"classic",lastTime=0,toastTimer=0;

const skins={
 classic:{name:"Klasik",emoji:"🐝",unlock:0},
 gold:{name:"Emas",emoji:"🟡",unlock:100},
 red:{name:"Merah",emoji:"🔴",unlock:250},
 ghost:{name:"Hantu",emoji:"👻",unlock:500},
};
const achievements=[
 ["first","Langkah Pertama","Capai skor 15.",s=>s>=15],
 ["honey","Pecinta Madu","Kumpulkan 10 madu.",s=>honey>=10],
 ["level3","Penjelajah","Capai Level 3.",s=>level>=3],
 ["score100","Lebah Hebat","Capai skor 100.",s=>s>=100],
 ["score250","Raja Kebun","Capai skor 250.",s=>s>=250],
];

function resize(){let r=c.getBoundingClientRect();W=r.width;H=r.height;c.width=Math.floor(W*devicePixelRatio);c.height=Math.floor(H*devicePixelRatio);x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);COLS=Math.max(5,Math.floor(W/GRID))}
addEventListener("resize",resize);resize();
const rnd=(a,b)=>Math.random()*(b-a)+a, pick=a=>a[Math.floor(Math.random()*a.length)];

class Bee{
 reset(){this.gx=Math.floor(COLS/2);this.gy=2;this.px=this.gx*GRID+5;this.py=H-this.gy*GRID+5;this.wave=0}
 update(){this.px+=(this.gx*GRID+5-this.px)*.3;this.py+=(H-this.gy*GRID+5-this.py)*.3;this.wave+=.2}
 draw(){let X=this.px+20,Y=this.py+20+Math.sin(this.wave)*1.5; x.save();x.translate(X,Y);
 x.fillStyle="#0003";x.beginPath();x.ellipse(0,18,17,6,0,0,6.28);x.fill();
 x.font="38px sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText(skins[selected].emoji,0,0);x.restore()}
}
class Row{
 constructor(g,l){this.g=g;this.y=H-g*GRID;this.type=(g>2&&(g-2)%HIVE===0)?"hive":(Math.random()<.5?"safe":"flower");this.flowers=[];this.speed=rnd(1,1.7)*(1+(l-1)*.3)*(Math.random()<.5?-1:1);
  if(this.type==="flower")for(let i=0,n=2+Math.floor(Math.random()*3);i<n;i++)this.flowers.push({x:rnd(-30,W+30),r:rnd(18,23),rot:rnd(0,6.28),col:pick(["#ff5364","#9b59b6","#3498db","#f368e0"])})
 }
 update(dt){if(this.type==="flower")for(const f of this.flowers){f.x+=this.speed*dt;f.rot+=.01*dt;if(f.x>W+45)f.x=-45;if(f.x<-45)f.x=W+45}}
 draw(){let y=this.y+camera;if(y<-50||y>H+50)return;
  if(this.type==="safe"){x.fillStyle="#4ca82f";x.fillRect(0,y,W,GRID);x.fillStyle="#77c957";for(let i=10;i<W;i+=45){x.beginPath();x.arc(i,y+25+(this.g%2)*6,2,0,6.28);x.fill()}}
  else if(this.type==="hive"){let g=x.createLinearGradient(0,y,0,y+GRID);g.addColorStop(0,"#f8c943");g.addColorStop(1,"#d78312");x.fillStyle=g;x.fillRect(0,y,W,GRID);x.fillStyle="#fff9";x.font="bold 12px system-ui";x.textAlign="center";x.fillText("🍯 SARANG CHECKPOINT 🍯",W/2,y+30)}
  else{x.fillStyle="#61b838";x.fillRect(0,y,W,GRID);for(const f of this.flowers){x.save();x.translate(f.x,y+25);x.rotate(f.rot);x.fillStyle=f.col;for(let i=0;i<6;i++){x.rotate(1.047);x.beginPath();x.ellipse(f.r*.55,0,f.r*.5,f.r*.28,0,0,6.28);x.fill()}x.fillStyle="#ffe66d";x.beginPath();x.arc(0,0,7,0,6.28);x.fill();x.restore()}}
 }
}
function newGame(){resize();rows=[];score=0;level=1;honey=0;camera=0;bee=new Bee;bee.reset();for(let i=0;i<24;i++){let r=new Row(i,1);if(i<=2){r.type="safe";r.flowers=[]}rows.push(r)}state="playing";hideScreens();$("pause").style.display="block";hud()}
function hideScreens(){document.querySelectorAll(".screen").forEach(e=>e.classList.add("hidden"))}
function hud(){$("level").textContent=level;$("score").textContent=score;$("honey").textContent=honey;$("best").textContent=best}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),1100)}
function move(d){
 if(state==="menu"){newGame();return} if(state==="gameover"){newGame();return} if(state!=="playing")return;
 if(d==="up"){bee.gy++;let dist=bee.gy-2;if(dist>score)score=dist;let nl=Math.floor(dist/HIVE)+1;if(nl>level){level=nl;honey+=5;score+=5;toast("🍯 SARANG! +5 Madu +5 Skor")}}
 if(d==="down"&&bee.gy>2)bee.gy--;if(d==="left"&&bee.gx>0)bee.gx--;if(d==="right"&&bee.gx<COLS-1)bee.gx++;
 if(score>best){best=score;localStorage.setItem("lebahBest",best)}checkAchievements();hud()
}
function collision(){let r=rows.find(z=>z.g===bee.gy);if(!r||r.type!=="flower")return false;let px=bee.px+20,py=bee.py+20;return r.flowers.some(f=>Math.hypot(px-f.x,py-(r.y+25))<f.r+13)}
function gameOver(){state="gameover";$("finalScore").textContent=score;$("finalLevel").textContent=level;$("finalHoney").textContent=honey;$("finalBest").textContent=best;$("newRecord").classList.toggle("hidden",score<best);$("gameover").classList.remove("hidden");$("pause").style.display="none"}
function checkAchievements(){let a=JSON.parse(localStorage.getItem("lebahAchievements")||"[]");for(const q of achievements)if(!a.includes(q[0])&&q[3](score)){a.push(q[0]);localStorage.setItem("lebahAchievements",JSON.stringify(a));toast("🏆 "+q[1]+" terbuka!")}}
function renderSkins(){let box=$("skins");box.innerHTML="";for(const [id,s] of Object.entries(skins)){let unlocked=best>=s.unlock;let d=document.createElement("button");d.className="skin "+(selected===id?"selected ":"")+(unlocked?"":"locked");d.innerHTML=`<div class="emoji">${s.emoji}</div><b>${s.name}</b><br><small>${unlocked?"PILIH":"Skor "+s.unlock}</small>`;d.onclick=()=>{if(unlocked){selected=id;localStorage.setItem("lebahSkin",id);renderSkins()}};box.appendChild(d)}}
function renderAchievements(){let box=$("achievements"),done=JSON.parse(localStorage.getItem("lebahAchievements")||"[]");box.innerHTML=achievements.map(a=>`<div class="achievement ${done.includes(a[0])?"done":""}"><strong>${done.includes(a[0])?"✅":"🔒"} ${a[1]}</strong><small>${a[2]}</small></div>`).join("")}

$("play").onclick=newGame;$("again").onclick=newGame;$("restartP").onclick=newGame;
$("resume").onclick=()=>{state="playing";$("pauseScreen").classList.add("hidden")};
$("pause").onclick=()=>{if(state==="playing"){state="paused";$("pauseScreen").classList.remove("hidden")}};
$("home").onclick=()=>{state="menu";hideScreens();$("start").classList.remove("hidden");$("pause").style.display="none"};
$("skinMenu").onclick=()=>{renderSkins();$("start").classList.add("hidden");$("skinScreen").classList.remove("hidden")};
$("achMenu").onclick=()=>{renderAchievements();$("start").classList.add("hidden");$("achScreen").classList.remove("hidden")};
document.querySelectorAll(".back").forEach(b=>b.onclick=()=>{hideScreens();$("start").classList.remove("hidden")});
document.querySelectorAll("#controls button").forEach(b=>b.addEventListener("pointerdown",e=>{e.preventDefault();move(b.dataset.dir)}));
let sx=0,sy=0;c.addEventListener("pointerdown",e=>{sx=e.clientX;sy=e.clientY});c.addEventListener("pointerup",e=>{let dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<28)return;move(Math.abs(dx)>Math.abs(dy)?dx>0?"right":"left":dy>0?"down":"up")});
addEventListener("keydown",e=>{let k=e.key.toLowerCase(),m={arrowup:"up",w:"up",arrowdown:"down",s:"down",arrowleft:"left",a:"left",arrowright:"right",d:"right"};if(m[k]){e.preventDefault();move(m[k])}if(k==="p")$("pause").click()});

bee=new Bee;bee.reset();$("pause").style.display="none";hud();
function loop(t){let dt=Math.min(2,(t-lastTime||16)/16);lastTime=t;x.clearRect(0,0,W,H);
 if(state==="playing"){let top=rows[rows.length-1]?.g||0;if(bee.gy>top-10)for(let i=1;i<=12;i++)rows.push(new Row(top+i,level));if(rows.length>55)rows=rows.filter(r=>r.g>bee.gy-18);let target=bee.gy*GRID-H+250;camera+=(target-camera)*.08}
 for(const r of rows){r.update(dt);r.draw()}if(bee){bee.update();x.save();x.translate(0,camera);bee.draw();x.restore()}if(state==="playing"&&collision())gameOver();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
