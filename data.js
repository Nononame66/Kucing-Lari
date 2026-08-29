// ABOUTME: Static game data — grid config, purchasable cat skins, achievements, and tutorial text.
// ABOUTME: Pure data with no DOM or canvas logic so it can be imported anywhere.
export const GRID=50,CHECKPOINT=15;
export const skins={
 classic:{name:"Klasik",cost:0,body:"#f6c343",stripe:"#2b2118"},
 gold:{name:"Emas",cost:50,body:"#ffe27a",stripe:"#b8860b",shine:true},
 red:{name:"Merah",cost:120,body:"#ff7a63",stripe:"#7a1d10"},
 ghost:{name:"Hantu",cost:250,body:"#e4ecff",stripe:"#9db0d6",alpha:.6},
 queen:{name:"Ratu",cost:500,body:"#ffd34e",stripe:"#7a4b00",crown:true}
};
export const achievements=[
 ["first","Langkah Pertama","Capai skor 15.",s=>s.score>=15],
 ["fish","Pecinta Ikan","Kumpulkan total 25 ikan.",s=>s.totalFish>=25],
 ["level3","Penjelajah","Capai Level 3.",s=>s.level>=3],
 ["score100","Kucing Hebat","Capai skor 100.",s=>s.score>=100],
 ["score250","Raja Kebun","Capai skor 250.",s=>s.score>=250],
 ["combo","Combo Master","Capai Combo x10.",s=>s.combo>=10],
 ["power10","Kolektor Power-up","Gunakan 10 power-up.",s=>s.powerUses>=10],
 ["level5","Kucing Cepat","Capai Level 5.",s=>s.level>=5],
 ["score500","Legenda Taman","Capai skor 500.",s=>s.score>=500]
];
export const tutorial=[
"<b>GERAK</b><br>Swipe atau tekan tombol/Arrow untuk memindahkan kucing satu grid.",
"<b>HINDARI LEBAH</b><br>Lebah bergerak horizontal. Tabrakan tanpa shield membuat game over.",
"<b>KUMPULKAN IKAN</b><br>Ikan menjadi mata uang untuk membeli skin.",
"<b>POWER-UP MAGNET</b><br>Magnet menarik ikan di sekitar kucing selama beberapa detik.",
"<b>POWER-UP SHIELD</b><br>Shield menyelamatkanmu dari satu tabrakan.",
"<b>POWER-UP LARI CEPAT</b><br>Melompat 2 kotak sekaligus saat naik — bisa melompati lebah!",
"<b>POWER-UP SKOR GANDA</b><br>Semua skor dari ikan & nyaris kena dikalikan dua sementara.",
"<b>COMBO & NEAR MISS</b><br>Ambil ikan beruntun untuk combo. Hindari lebah sangat dekat untuk bonus.",
"<b>RUMAH</b><br>Setiap 15 langkah naik level dan mendapat bonus ikan. Lebah makin cepat."
];
