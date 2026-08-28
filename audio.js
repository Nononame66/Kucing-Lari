let ctx=null;
function audio(){if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==="suspended")ctx.resume();return ctx}
export function beep(freq=500,dur=.08,type="sine",enabled=true){if(!enabled)return;const A=audio(),o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.value=freq;g.gain.value=.035;o.connect(g);g.connect(A.destination);o.start();g.gain.exponentialRampToValueAtTime(.001,A.currentTime+dur);o.stop(A.currentTime+dur)}
export function vibrate(ms,enabled){if(enabled&&navigator.vibrate)navigator.vibrate(ms)}