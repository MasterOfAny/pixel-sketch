const range = document.querySelector('.range');
const rangeInfo = document.querySelector('.range-info');

const grid = document.querySelector('.draw-grid')
const cursor = document.querySelector(".custom-cursor");

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)



function showValue(e) {
    rangeInfo.textContent = e.target.value;

}
function setColor(e) {
    if (e.type === 'mousemove') { console.log('over') }
    e.target.style.backgroundColor = '#000000';
}

function createGrid(e) {
    grid.innerHTML = "";
    for (let i = 0; i < e.target.value * e.target.value; i++) {
        const gridCell = document.createElement('div');

        gridCell.addEventListener('mousedown', setColor)
        grid.append(gridCell)
        gridCell.classList.add('grid__cell')
    }
    grid.style.gridTemplateColumns = `repeat(${e.target.value
        }, 2fr)`;
    grid.style.gridTemplateRows = `repeat(${e.target.value
        }, 2fr)`;
}




//events
range.addEventListener('input', showValue)
range.addEventListener('change', createGrid)
