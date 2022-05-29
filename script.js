let canvas = document.getElementsByClassName("sound-waves-canvas")[0];
let ctx = canvas.getContext("2d");    
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let waves = [];
let mwhBoost = 1;  // max wave height boost
let osBoost = 1;  // oscillation speed boost
let dsBoost = 1;  // drift speed boost

function Wave( maxWaveHeight, waveFrequency, oscillationSpeed, driftSpeed, color, thickness ) {  
  this.maxWaveHeight = maxWaveHeight;
  this.waveFrequency = waveFrequency;
  this.oscillationSpeed = oscillationSpeed;
  this.driftSpeed = driftSpeed;
  this.color = color;
  this.thickness = thickness;
  this.waveHeightIsInscreasing = false;
  this.currentWaveHeight = 0;
  this.currentDrift = 0;
}

function animateWaves() {
  ctx.clearRect( 0, 0, canvasWidth, canvasHeight );
  for ( wave of waves ) {
    let cmwh = wave.maxWaveHeight*mwhBoost;  // current max wave height
    let cos = wave.oscillationSpeed*osBoost;  // current oscillation speed
    let cds = wave.driftSpeed*dsBoost;  // current drift speed
    ctx.beginPath();
    for ( let i=0; i<canvasWidth; i++ ) {
      ctx.lineTo( i, Math.sin( (i+wave.currentDrift)/wave.waveFrequency ) * wave.currentWaveHeight + canvasHeight/2 );
    }
    ctx.strokeStyle = wave.color;
    ctx.lineWidth = wave.thickness;
    ctx.stroke();
    wave.waveHeightIsInscreasing ? wave.currentWaveHeight += cos : wave.currentWaveHeight -= cos;
    wave.currentDrift += cds;
    if ( wave.currentWaveHeight > cmwh ) { 
      wave.waveHeightIsInscreasing = false } 
    else if ( wave.currentWaveHeight < -cmwh ) { 
      wave.waveHeightIsInscreasing = true 
    }
  }
  requestAnimationFrame( animateWaves );
}

$(".sound-waves-canvas").mouseover( function() { mwhBoost = 1.5; osBoost = 3; dsBoost = 3 });
$(".sound-waves-canvas").mouseleave( function() { mwhBoost = 1; osBoost = 1; dsBoost = 1 });

$( ()=> {
  //maxWaveHeight, waveFrequency, oscillationSpeed, driftSpeed, color, thickness
  waves.push( new Wave( 200, 60, 8, 8, "rgba(27,30,78,0.5)", 15 ) );
  waves.push( new Wave( 150, 75, 6, -4, "rgba(34,132,238,0.5)", 12 ) );
  waves.push( new Wave( 100, 100, 14, 10, "rgba(251,15,80,0.5)", 10 ) ); 
  animateWaves();
})