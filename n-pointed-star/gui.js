const pointsRef = document.getElementById('points-input');
const radiusRef = document.getElementById('radius-input');

const sequencesWrapperRef = document.getElementById('points-sequences-wrapper');

const pointsLabelRef = document.getElementById('points-label');
const radiusLabelRef = document.getElementById('radius-label');

pointsRef.addEventListener('input', e => {
  const value = e.target.value;
  numPoints = value;
  pointsLabelRef.innerHTML = numPoints;
  generatePoints();
  draw();
});

radiusRef.addEventListener('input', e => {
  const value = e.target.value;
  radius = value;
  radiusLabelRef.innerHTML = radius;
  generatePoints();
  draw();
});

function addSequence() {
  const divElem = document.createElement('div');
  const labelElem = document.createElement('p');
  const inputElem = document.createElement('input');
  const btnElem = document.createElement('button');

  numSequences++;

  labelElem.innerHTML = `Sequence ${numSequences}`;
  inputElem.type = 'text';
  inputElem.id = `sequence-input-${numSequences}`;
  btnElem.innerText = 'X';
  btnElem.onclick = () => {
    divElem.remove();
  }

  divElem.classList.add('sequence');

  inputElem.addEventListener('input', e => {
    const value = e.target.value;
    pointsSequences[numSequences] = value.split(',').map(n => parseInt(n.trim())).filter(n => n);
    if (value == '') pointsSequences[numSequences] = [];
    draw();
  });

  divElem.appendChild(labelElem);
  divElem.appendChild(inputElem);
  divElem.appendChild(btnElem);
  sequencesWrapperRef.appendChild(divElem);
}