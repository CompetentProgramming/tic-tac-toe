(function () {
    // main variables
    const circleHTML = '<i class="far fa-circle"></i>';
    const crossHTML = '<i class="fas fa-times"></i>';
    const allCells = document.querySelectorAll('.grid button');

    const scoreCross = document.querySelector('.score__item.cross strong');
    const scoreCircle = document.querySelector('.score__item.circle strong');
    const scoreDraw = document.querySelector('.score__item.draw strong');
    const activePlayer = document.querySelector('.active-user');

    const winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let gameStatus = ['', '', '', '', '', '', '', '', ''];
    
    // TRUE = cross || FALSE = circle
    let currentPlayer = true;

    // current step no more then 10;
    let currentStep = 0;

    document.querySelector('.new-game').addEventListener('click', () => newGame());

    allCells.forEach((cell, index) => {
        cell.addEventListener('click', (event) => {
            const eventTarget = event.target;
            userSelectCell(index);
            insertIconIntoCell(eventTarget);
            disableCell(eventTarget);
            currentStep++;
            if (checkWin() || currentStep === 9) {
                updateStats();
                newGame();
            } else {
                changePlayer();
            }
        });
    });

    function userSelectCell(idx) {
        gameStatus[idx] = currentPlayer;
    }

    function insertIconIntoCell(target) {
        target.innerHTML = currentPlayer ? crossHTML : circleHTML;
    }

    function disableCell(target) {
        target.disabled = true;
    }
    
    function changePlayer() {
        currentPlayer = !currentPlayer;
        activePlayer.classList.toggle('active');
    }

    function checkWin() {
        if (currentStep < 5) {
            return false;
        }
        return winCondition.some(winIndexes => getSelectedItemsPerIndexes(winIndexes).every(val => val === currentPlayer));
    }

    function getSelectedItemsPerIndexes(idxs) {
        return [gameStatus[idxs[0]], gameStatus[idxs[1]], gameStatus[idxs[2]]];
    }

    function updateStats() {
        if (currentStep === 9) {
            plusToStat(scoreDraw);
        } else {
            currentPlayer ? plusToStat(scoreCross) : plusToStat(scoreCircle);
        }
    }

    function plusToStat(elem) {
        let currentScore = +elem.innerText;
        elem.innerText = currentScore + 1;
    }

    function newGame() {
        gameStatus = ['', '', '', '', '', '', '', '', ''];
        currentStep = 0;
        resetGrid();
    }

    function resetGrid() {
        allCells.forEach(cell => {
            cell.disabled = false;
            cell.innerText = '';
        });
    }

}());