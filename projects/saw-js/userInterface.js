const rowsTextInputRef = document.querySelector('#rows-input');
const columnsTextInputRef = document.querySelector('#columns-input');
const lengthTextInputRef = document.querySelector('#length-input');

const rowsSliderInputRef = document.querySelector('#rows-slider');
const columnsSliderInputRef = document.querySelector('#columns-slider');
const lengthSliderInputRef = document.querySelector('#length-slider');

const walkButtonRef = document.querySelector('#walk-button');
const canvasRef = document.querySelector('canvas');

const data = {
  rows: 10,
  columns: 18,
  length: 50,
}

const onInputChange = (refs, value) => {
  for (const ref of refs) {
    ref.value = value;
  }
  setup();
}

const beginWalk = (x, y) => {
  setup();
  walk(grid, x, y, data.length);
}

const onCanvasClick = (x, y) => {
  const row = Math.floor(y / (canvas.height / data.rows));
  const col = Math.floor((x - xOffset) / ((canvas.width - xOffset * 2) / data.columns));
  beginWalk(col, row);
}

rowsTextInputRef.addEventListener('input', _ => {
  data.rows = parseInt(rowsTextInputRef.value);
  onInputChange(
    [rowsTextInputRef, rowsSliderInputRef], rowsTextInputRef.value
  );
});
rowsSliderInputRef.addEventListener('input', _ => {
  data.rows = parseInt(rowsSliderInputRef.value);
  onInputChange(
    [rowsTextInputRef, rowsSliderInputRef], rowsSliderInputRef.value
  );
});

columnsTextInputRef.addEventListener('input', _ => {
  data.columns = parseInt(columnsTextInputRef.value);
  onInputChange(
    [columnsTextInputRef, columnsSliderInputRef], columnsTextInputRef.value
  );
});
columnsSliderInputRef.addEventListener('input', _ => {
  data.columns = parseInt(columnsSliderInputRef.value);
  onInputChange(
    [columnsTextInputRef, columnsSliderInputRef], columnsSliderInputRef.value
  );
});

lengthTextInputRef.addEventListener('input', _ => {
  data.length = parseInt(lengthTextInputRef.value);
  onInputChange(
    [lengthTextInputRef, lengthSliderInputRef], lengthTextInputRef.value
  );
});
lengthSliderInputRef.addEventListener('input', _ => {
  data.length = parseInt(lengthSliderInputRef.value);
  onInputChange(
    [lengthTextInputRef, lengthSliderInputRef], lengthSliderInputRef.value
  );
});

walkButtonRef.addEventListener('click', () => beginWalk(0, 0));
canvasRef.addEventListener('click', e => onCanvasClick(e.offsetX, e.offsetY));