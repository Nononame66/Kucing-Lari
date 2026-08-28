const get=(k,d)=>{try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch{return d}};
export const profile=()=>localStorage.getItem("lebahProfile")||"Pemain";
export function saveProfile(v){localStorage.setItem("lebahProfile",v)}
export const totalHoney=()=>+localStorage.getItem("lebahHoney")||0;
export function setHoney(v){localStorage.setItem("lebahHoney",String(v))}
export const best=()=>+localStorage.getItem("lebahBest")||0;
export function setBest(v){localStorage.setItem("lebahBest",String(v))}
export const selected=()=>localStorage.getItem("lebahSkin")||"classic";
export function setSelected(v){localStorage.setItem("lebahSkin",v)}
export const owned=()=>get("lebahOwned",["classic"]);
export function setOwned(v){localStorage.setItem("lebahOwned",JSON.stringify(v))}
export const settings=()=>get("lebahSettings",{music:true,sfx:true,vibrate:true,contrast:false});
export function setSettings(v){localStorage.setItem("lebahSettings",JSON.stringify(v))}
export const achievementsDone=()=>get("lebahAchievements",[]);
export function setAchievements(v){localStorage.setItem("lebahAchievements",JSON.stringify(v))}