const range = document.querySelector('.range');
const rangeInfo = document.querySelector('.range-info');

const grid = document.querySelector('.draw-grid')
const colorPick = document.querySelector(".color-picker");
let color = '#000000';

const clear = document.querySelector('.clear');
const pen = document.querySelector('.pen');
const rainbowPen = document.querySelector('.rainbow-pen');
const eraser = document.querySelector('.eraser');

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)
let gridSize = 8;
let currentInstrument = 'pen';


function showValue(e) {
    rangeInfo.textContent = `${e.target.value} x ${e.target.value}`;

}

function paint(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentInstrument === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentInstrument === 'pen') {
        e.target.style.backgroundColor = color
    } else if (currentInstrument === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}
function createGrid(e) {
    grid.classList.add('draw-grid--animated')
    setTimeout(() => {
        grid.innerHTML = "";
        typeof e === 'object' ? gridSize = e.target.value : {}
        for (let i = 0; i < gridSize * gridSize; i++) {
            const gridCell = document.createElement('div');
            grid.append(gridCell)
            gridCell.classList.add('grid__cell')
            gridCell.setAttribute('draggable', 'false')
            gridCell.addEventListener('mouseover', paint)
            gridCell.addEventListener('mousedown', paint)
        }
        grid.style.gridTemplateColumns = `repeat(${gridSize
            }, 2fr)`;
        grid.style.gridTemplateRows = `repeat(${gridSize
            }, 2fr)`;

        grid.classList.remove('draw-grid--animated')
    }, 300)

}

function setColor(e) {
    color = e.target.value
}
function setInstrument(type) {
    currentInstrument = type;
    if (type === 'pen') {
        currentInstrument = 'pen'
        pen.classList.add('choosed-item');
        rainbowPen.classList.remove('choosed-item');
        eraser.classList.remove('choosed-item');

    } else if (type === 'rainbow') {
        pen.classList.remove('choosed-item');
        rainbowPen.classList.add('choosed-item');
        eraser.classList.remove('choosed-item');
    } else {
        pen.classList.remove('choosed-item');
        rainbowPen.classList.remove('choosed-item');
        eraser.classList.add('choosed-item');
    }

}

createGrid(gridSize)
pen.classList.add('choosed-item')


//events
range.addEventListener('input', showValue);
range.addEventListener('change', createGrid);
colorPick.addEventListener('change', setColor);
clear.addEventListener('click', () => { createGrid(gridSize) });
pen.addEventListener('click', () => { setInstrument('pen') });
rainbowPen.addEventListener('click', () => { setInstrument('rainbow') });
eraser.addEventListener('click', () => { setInstrument('eraser') });
