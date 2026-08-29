// ABOUTME: Sound effects, background music loop, and vibration helpers using Web Audio.
// ABOUTME: All audio is generated procedurally (oscillators) — no audio asset files needed.
let ctx=null;
function audio(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==="suspended")ctx.resume();return ctx}
export function beep(freq=500,dur=.08,type="sine",enabled=true){if(!enabled)return;const A=audio(),o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.value=freq;g.gain.value=.035;o.connect(g);g.connect(A.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,A.currentTime+dur);o.stop(A.currentTime+dur)}
export function vibrate(ms,enabled){if(enabled&&navigator.vibrate)navigator.vibrate(ms)}

const SCALE=[196,220,247,294,330,392,440]; // pentatonic-ish, low octave
const PATTERN=[0,2,4,2,0,4,5,4,0,2,3,2];
let musicTimer=null,musicStep=0;
function musicStepPlay(){const A=audio(),freq=SCALE[PATTERN[musicStep%PATTERN.length]],o=A.createOscillator(),g=A.createGain();o.type="triangle";o.frequency.value=freq;g.gain.value=.022;o.connect(g);g.connect(A.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,A.currentTime+.85);o.stop(A.currentTime+.85);musicStep++}
export function startMusic(){if(musicTimer)return;musicStepPlay();musicTimer=setInterval(musicStepPlay,480)}
export function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null}}
