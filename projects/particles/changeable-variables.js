let amount = 120
let radiusAmplifier = 1
let lineDistance = 200
let lineWidth = 1
let speedAmplifier = 1
let depth = 360
let fillColor = '#ffffff'
let strokeColor = '#ffffff'
let lineColor = '#ffffff'

function fillFields() {
  document.getElementById('amount-slider').value = amount
  document.getElementById('amount-field').value = amount
  document.getElementById('radiusAmp-slider').value = radiusAmplifier
  document.getElementById('radiusAmp-field').value = radiusAmplifier
  document.getElementById('lineDist-slider').value = lineDistance
  document.getElementById('lineDist-field').value = lineDistance
  document.getElementById('lineWidth-slider').value = lineWidth
  document.getElementById('lineWidth-field').value = lineWidth
  document.getElementById('speedAmp-slider').value = speedAmplifier
  document.getElementById('speedAmp-field').value = speedAmplifier
  document.getElementById('depth-slider').value = depth
  document.getElementById('depth-field').value = depth
}

function updateColor(index) {
  switch(index) {
    case 0:
      fillColor = document.getElementById('fillColor').value
      break;
    case 1:
      strokeColor = document.getElementById('strokeColor').value
      break;
    case 2:
      lineColor = document.getElementById('lineColor').value
      break;
  }
}

function updateBGColor() {
  document.body.style.backgroundColor = document.getElementById('input-background').value
}

function hexToRgbA(hex){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',';
  }
  throw new Error('Bad Hex');
}

document.getElementById('amount-slider').oninput = function() { 
  document.getElementById('amount-field').value = this.value
  amount = this.value
  if (amount > particles.length) {
    for (let i = 0; i < amount - particles.length; i++)
      particles.push(new Particle())
  } else {
    for (let i = 0; i < particles.length - amount; i++)
      particles.pop()
  }
}
document.getElementById('amount-field').oninput = function() { 
  document.getElementById('amount-slider').value = this.value
  amount = this.value
  if (amount > particles.length) {
    for (let i = 0; i < amount - particles.length; i++)
      particles.push(new Particle())
  } else {
    for (let i = 0; i < particles.length - amount; i++)
      particles.pop()
  }
}
document.getElementById('radiusAmp-slider').oninput = function() { 
  document.getElementById('radiusAmp-field').value = this.value
  radiusAmplifier = this.value
}
document.getElementById('radiusAmp-field').oninput = function() { 
  document.getElementById('radiusAmp-slider').value = this.value
  radiusAmplifier = this.value
}
document.getElementById('lineDist-slider').oninput = function() { 
  document.getElementById('lineDist-field').value = this.value
  lineDistance = this.value
}
document.getElementById('lineDist-field').oninput = function() { 
  document.getElementById('lineDist-slider').value = this.value
  lineDistance = this.value
}
document.getElementById('lineWidth-slider').oninput = function() { 
  document.getElementById('lineWidth-field').value = this.value
  lineWidth = this.value
}
document.getElementById('lineWidth-field').oninput = function() { 
  document.getElementById('lineWidth-slider').value = this.value
  lineWidth = this.value
}
document.getElementById('speedAmp-slider').oninput = function() { 
  document.getElementById('speedAmp-field').value = this.value
  speedAmplifier = this.value
}
document.getElementById('speedAmp-field').oninput = function() { 
  document.getElementById('speedAmp-slider').value = this.value
  speedAmplifier = this.value
}
document.getElementById('depth-slider').oninput = function() { 
  document.getElementById('depth-field').value = this.value
  depth = this.value
}
document.getElementById('depth-field').oninput = function() { 
  document.getElementById('depth-slider').value = this.value
  depth = this.value
}