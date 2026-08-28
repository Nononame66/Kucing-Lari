export const GRID=50,HIVE=15;
export const skins={classic:{name:"Klasik",emoji:"🐝",cost:0},gold:{name:"Emas",emoji:"🟡",cost:50},red:{name:"Merah",emoji:"🔴",cost:120},ghost:{name:"Hantu",emoji:"👻",cost:250},queen:{name:"Ratu",emoji:"👑",cost:500}};
export const achievements=[
 ["first","Langkah Pertama","Capai skor 15.",s=>s.score>=15],
 ["honey","Pecinta Madu","Kumpulkan total 25 madu.",s=>s.totalHoney>=25],
 ["level3","Penjelajah","Capai Level 3.",s=>s.level>=3],
 ["score100","Lebah Hebat","Capai skor 100.",s=>s.score>=100],
 ["score250","Raja Kebun","Capai skor 250.",s=>s.score>=250],
 ["combo","Combo Master","Capai Combo x10.",s=>s.combo>=10]
];
export const tutorial=[
"🐝 <b>GERAK</b><br>Swipe atau tekan tombol/Arrow untuk memindahkan lebah satu grid.",
"🌸 <b>HINDARI BUNGA</b><br>Bunga bergerak horizontal. Tabrakan tanpa shield membuat game over.",
"🍯 <b>KUMPULKAN MADU</b><br>Madu menjadi mata uang untuk membeli skin.",
"🧲 <b>POWER-UP MAGNET</b><br>Magnet menarik madu di sekitar lebah selama beberapa detik.",
"🛡️ <b>POWER-UP SHIELD</b><br>Shield menyelamatkanmu dari satu tabrakan.",
"🔥 <b>COMBO & NEAR MISS</b><br>Ambil madu beruntun untuk combo. Hindari bunga sangat dekat untuk bonus.",
"🏠 <b>SARANG</b><br>Setiap 15 langkah naik level dan mendapat bonus madu. Bunga makin cepat."
];