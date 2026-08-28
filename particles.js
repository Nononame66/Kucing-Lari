export class ParticleSystem{
 constructor(){this.items=[]}
 burst(x,y,color,n=12){for(let i=0;i<n;i++)this.items.push({x,y,vx:(Math.random()*6-3),vy:(Math.random()*6-3),life:1,size:2+Math.random()*4,color})}
 draw(ctx,dt){for(let i=this.items.length-1;i>=0;i--){const p=this.items[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.06*dt;p.life-=.035*dt;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);if(p.life<=0)this.items.splice(i,1)}ctx.globalAlpha=1}
}