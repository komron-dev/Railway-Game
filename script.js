import {EASY, HARD} from "./data.js"

const menuScreen = document.querySelector('#menu-screen');
const gameScreen = document.querySelector('#game-screen');
const playerDisplay = document.querySelector('#player-display');
const playerNameInput = document.querySelector('#player-name');
const rulesModal = document.querySelector('#rules-modal');
const startGameBtn = document.querySelector('#start-game-btn');
const backToMenuBtn = document.querySelector('#back-to-menu');
const rulesBtn = document.querySelector('#rules-btn');
const closeModalBtn = document.querySelector('#close-modal');
const gameGrid = document.querySelector('#game-grid');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const palette = document.querySelector('#palette');
const closePaletteBtn = document.querySelector('#close-palette');
const message = document.querySelector('#message');

let startTime;
let timerInterval;
const timerDisplay = document.querySelector('#timer');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 60000);

    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

let gridSize = 5;

startGameBtn.addEventListener('click', () => {
    if (!difficultySelected) {
        showMessage('Please select a difficulty level to start the game.');
        return;
    }

    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        showMessage('Please enter your name to start the game.');
        return;
    }
    if (playerName) {
        playerDisplay.textContent = playerName;
        menuScreen.style.display = 'none';
        gameScreen.style.display = 'block';

        const selectedDifficultyButton = document.querySelector('.difficulty-btn.active');
        const difficulty = selectedDifficultyButton ? selectedDifficultyButton.dataset.difficulty : 'easy';

        gridSize = (difficulty === 'easy') ? 5 : 7;
        initializeGrid(gridSize, difficulty);

        startTimer();
        hideMessage();
    }
});

function showMessage(text) {
    message.textContent = text;
    message.style.visibility = 'visible';
}

function hideMessage() {
    message.style.visibility = 'hidden';
}

backToMenuBtn.addEventListener('click', () => {
    gameScreen.style.display = 'none';
    menuScreen.style.display = 'block';
    stopTimer();

    difficultySelected = false;
    startGameBtn.classList.add('disabled');

    difficultyButtons.forEach(btn => btn.classList.remove('active'));
    playerNameInput.value = '';
});


rulesBtn.addEventListener('click', () => {
    rulesModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    rulesModal.style.display = 'none';
});


let difficultySelected = false;

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        difficultyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        difficultySelected = true;
    });
});


function initializeGrid(size, difficulty) {
    gameGrid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    gameGrid.style.gridTemplateRows = `repeat(${size}, 60px)`;
    gameGrid.innerHTML = '';

    const levelNumber = getRandomInt(1, 5);
    const map = (difficulty === 'easy') ? EASY[levelNumber] : HARD[levelNumber];

    map.forEach((row) => {
        row.forEach((tile) => {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');

            const match = tile.match(/_(\d+)\.png$/);
            if (match) {
                const degree = parseInt(match[1], 10);
                tile = tile.replace(/_\d+\.png$/, ".png");
                cell.style.backgroundImage = `url(${tile})`;
                cell.style.transform = `rotate(${degree}deg)`;
            } else {
                cell.style.backgroundImage = `url(${tile})`;
            }

            cell.addEventListener('click', () => {
                showPalette(cell);
            });
            gameGrid.appendChild(cell);
        });
    });
}




let selectedCell = null;

const TILE_OPTIONS = {
    empty: [
        { src: 'pics/tiles/straight_rail.png', type: 'straight', rotations: [0, 270] },
        { src: 'pics/tiles/curve_rail.png', type: 'curve', rotations: [0, 90, 180, 270] }
    ],
    bridge: [
        { src: 'pics/tiles/bridge_rail.png', type: 'bridge' }
    ],
    mountain: [
        { src: 'pics/tiles/mountain_rail.png', type: 'mountain' }
    ],
    oasis: []
};

function showPalette(cell) {
    selectedCell = cell;
    selectedCell.classList.add('selected');

    document.querySelectorAll('.grid-cell').forEach(c => {
        if (c !== selectedCell) {
            c.classList.add('disabled');
        }
    });

    const terrainType = getTerrainType(cell);
    const tileOptions = TILE_OPTIONS[terrainType];

    palette.innerHTML = '';
    palette.appendChild(closePaletteBtn);

    if (!tileOptions || tileOptions.length === 0) {
        const message = document.createElement('div');
        message.textContent = 'No tiles available for this terrain type';
        palette.appendChild(message);
    } else if (terrainType === 'empty') {
        tileOptions.forEach(option => {
            const rotations = option.rotations;
            rotations.forEach(rotation => {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.style.backgroundImage = `url(${option.src})`;
                tile.style.transform = `rotate(${rotation}deg)`;
                tile.dataset.tile = option.src;
                tile.dataset.rotation = rotation.toString();

                tile.addEventListener('click', () => {
                    selectedCell.style.backgroundImage = `url(${option.src})`;
                    selectedCell.style.transform = `rotate(${rotation}deg)`;
                    closePalette();
                });

                palette.appendChild(tile);
            });
        });
    }
    else {
        const option = TILE_OPTIONS[terrainType][0];
        const tile = document.createElement('div');
        tile.classList.add('tile');
        const rotationDegree = getCellRotation(cell)
        tile.style.backgroundImage = `url(${option.src})`;
        tile.style.transform = `rotate(${rotationDegree}deg)`;
        tile.dataset.rotation = rotationDegree.toString();
        tile.addEventListener('click', () => {
            selectedCell.style.backgroundImage = `url(${option.src})`;
            selectedCell.style.transform = `rotate(${rotationDegree}deg)`;
            closePalette();
        });

        palette.appendChild(tile);

    }

    const cellRect = cell.getBoundingClientRect();
    palette.style.left = `${cellRect.left}px`;
    palette.style.top = `${cellRect.top - palette.offsetHeight}px`;
    palette.style.display = 'block';
}

function getTerrainType(cell) {
    const backgroundImage = cell.style.backgroundImage;
    if (backgroundImage.includes('empty')) return 'empty';
    if (backgroundImage.includes('bridge')) return 'bridge';
    if (backgroundImage.includes('mountain')) return 'mountain';
    if (backgroundImage.includes('oasis')) return 'oasis';
    return 'empty';
}

function getCellRotation(cell) {
    const transform = cell.style.transform;
    const match = transform.match(/rotate\((\d+)deg\)/);
    return match ? parseInt(match[1], 10) : 0;
}

function closePalette() {
    palette.style.display = 'none';
    selectedCell.classList.remove('selected');
    selectedCell = null;

    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('disabled');
    });
}

gameGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('grid-cell') && !event.target.classList.contains('disabled')) {
        showPalette(event.target);
    }
});

palette.addEventListener('click', (event) => {
    if (event.target.classList.contains('tile') && selectedCell) {
        const tileUrl = event.target.dataset.tile;

        selectedCell.style.backgroundImage = `url(${tileUrl})`;
        const rotationDegree = getCellRotation(selectedCell);
        selectedCell.style.transform = `rotate(${rotationDegree}deg)`;

        closePalette();
    }
});

closePaletteBtn.addEventListener('click', closePalette);


