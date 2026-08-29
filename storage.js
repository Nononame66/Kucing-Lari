// ABOUTME: Reads and writes player profile, currency, skins, settings, achievements, and leaderboard.
// ABOUTME: Wraps localStorage with JSON-safe getters/setters.
const get=(k,d)=>{try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch{return d}};
export const profile=()=>localStorage.getItem("kucingProfile")||"Pemain";
export function saveProfile(v){localStorage.setItem("kucingProfile",v)}
export const totalFish=()=>+localStorage.getItem("kucingIkan")||0;
export function setFish(v){localStorage.setItem("kucingIkan",String(v))}
export const best=()=>+localStorage.getItem("kucingBest")||0;
export function setBest(v){localStorage.setItem("kucingBest",String(v))}
export const selected=()=>localStorage.getItem("kucingSkin")||"classic";
export function setSelected(v){localStorage.setItem("kucingSkin",v)}
export const owned=()=>get("kucingOwned",["classic"]);
export function setOwned(v){localStorage.setItem("kucingOwned",JSON.stringify(v))}
export const settings=()=>get("kucingSettings",{music:true,sfx:true,vibrate:true,contrast:false});
export function setSettings(v){localStorage.setItem("kucingSettings",JSON.stringify(v))}
export const achievementsDone=()=>get("kucingAchievements",[]);
export function setAchievements(v){localStorage.setItem("kucingAchievements",JSON.stringify(v))}
export const leaderboard=()=>get("kucingLeaderboard",[]);
export function addToLeaderboard(entry){const list=leaderboard();list.push(entry);list.sort((a,b)=>b.score-a.score);const top=list.slice(0,5);localStorage.setItem("kucingLeaderboard",JSON.stringify(top));return top}
