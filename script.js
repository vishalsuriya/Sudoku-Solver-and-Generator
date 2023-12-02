const boards = {
    easy: [
        [0, 0, 7, 4, 9, 1, 6, 0, 5],
        [2, 0, 0, 0, 6, 0, 3, 0, 9],
        [0, 0, 0, 0, 0, 7, 0, 1, 0],
        [0, 5, 8, 6, 0, 0, 0, 0, 4],
        [0, 0, 3, 0, 0, 0, 0, 9, 0],
        [0, 0, 6, 2, 0, 0, 1, 8, 7],
        [9, 0, 4, 0, 7, 0, 0, 0, 2],
        [6, 7, 0, 8, 3, 0, 0, 0, 0],
        [8, 1, 0, 0, 4, 5, 0, 0, 0]
    ],
    medium: [
        [0, 0, 0, 0, 0, 0, 3, 9, 1],
        [0, 0, 0, 9, 0, 3, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 4, 0, 0, 0, 5],
        [0, 0, 0, 3, 0, 0, 0, 6, 0],
        [0, 0, 4, 0, 0, 6, 0, 0, 0],
        [3, 5, 0, 0, 0, 0, 7, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 8, 0]
        
    ],
    hard: [
        [0, 0, 9, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 6, 0, 7],
        [5, 8, 0, 3, 1, 0, 0, 0, 4],
        [1, 5, 0, 0, 4, 0, 3, 6, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 8],
        [0, 0, 0, 0, 9, 0, 0, 0, 0],
        [0, 0, 0, 7, 5, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 2, 0, 0, 3, 0, 0, 0]
    ],
};
const solutions = {
    easy: [
        [3, 8, 7, 4, 9, 1, 6, 2, 5],
        [2, 4, 1, 5, 6, 8, 3, 7, 9],
        [5, 6, 9, 3, 2, 7, 4, 1, 8],
        [7, 5, 8, 6, 1, 9, 2, 3, 4],
        [1, 2, 3, 7, 8, 5, 5, 9, 6],
        [4, 9, 6, 2, 5, 3, 1, 8, 7],
        [9, 3, 4, 1, 7, 6, 8, 5, 2],
        [6, 7, 5, 8, 3, 2, 9, 4, 1],
        [8, 1, 2, 9, 4, 5, 7, 6, 3]
    ],
    medium: [
        [2, 4, 5, 6, 7, 8, 3, 9, 1],
        [6, 7, 8, 9, 1, 3, 5, 2, 4],
        [9, 3, 1, 4, 5, 2, 6, 7, 8],
        [4, 9, 3, 2, 6, 5, 8, 1, 7],
        [7, 8, 6, 1, 4, 9, 2, 3, 5],
        [5, 1, 2, 3, 8, 7, 4, 6, 9],
        [8, 2, 4, 7, 9, 6, 1, 5, 3],
        [3, 5, 9, 8, 2, 1, 7, 4, 6],
        [1, 6, 7, 5, 3, 4, 9, 8, 2]        
    ],
    hard: [
        [6, 1, 9, 4, 7, 2, 5, 8, 3],
        [2, 4, 3, 9, 8, 5, 6, 1, 7],
        [5, 8, 7, 3, 1, 6, 9, 2, 4],
        [1, 5, 8, 2, 4, 7, 3, 6, 9],
        [9, 2, 6, 5, 3, 1, 4, 7, 8],
        [7, 3, 4, 6, 9, 8, 1, 5, 2],
        [8, 9, 1, 7, 5, 4, 2, 3, 6],
        [3, 6, 5, 8, 2, 9, 7, 4, 1],
        [4, 7, 2, 1, 6, 3, 8, 9, 5]
    ],
};
let selectedDifficulty = "easy";
let selectedTime = 3 * 60; // Default: 3 minutes (in seconds)
let countdownInterval; // Variable to store the interval for the countdown timer
let numSelected = null;
let errors = 0;
let board = [];
let errorCount = 0;

const themeRadios = document.querySelectorAll('input[name="theme"]');
function updateThemeColors(theme) {
    const root = document.documentElement;
    if (theme === "dark") {
        root.style.setProperty('--background-color', '#333333'); // Dark background color
        root.style.setProperty('--text-color', '#ffffff'); // Dark text color
    } else {
        root.style.setProperty('--background-color', '#ffffff'); // Light background color
        root.style.setProperty('--text-color', '#000000'); // Light text color
    }
}

themeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
        updateThemeColors(this.value);
    });
});

const difficultyRadios = document.querySelectorAll('input[name="diff"]');
const timeRadios = document.querySelectorAll('input[name="time"]');
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");

// Event listener for difficulty selection
difficultyRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
        selectedDifficulty = this.value;
        clearInterval(countdownInterval);
        // Call the setGame function to update the game board
        setGame();
    });
});

// Event listener for time selection
timeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
        selectedTime = parseInt(this.value) * 60; // Convert minutes to seconds
        // Reset the timer when the time selection changes
        clearInterval(countdownInterval);
        timerElement.textContent = formatTime(selectedTime); // Update the timer display
    });
});

// Event listener for start button
startButton.addEventListener("click", function () {
    errors = 0;
    document.getElementById("errors").innerText = errors + "/3";
    // Stop the previous timer, if it exists
    clearInterval(countdownInterval);

    // Initialize the timer with the selectedTime
    startTimer(selectedTime);
    setGame();
});

function startTimer(duration) {
    let timer = duration;
    countdownInterval = setInterval(function () {
        timerElement.textContent = formatTime(timer);
        if (timer <= 0) {
            clearInterval(countdownInterval);
            timerElement.textContent = "00:00";
            // Handle timer expiration (game over) here
        }
        timer--;
    }, 1000);
}

// Helper function to format time as "MM:SS"
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function setGame() {
    document.getElementById("solution-display").innerHTML = "";
    // Clear the board and digits
    document.getElementById("board").innerHTML = "";
    document.getElementById("digits").innerHTML = "";

    // Set the board based on selectedDifficulty
    board = boards[selectedDifficulty];

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Create the Sudoku board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] !== 0) {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return; // Tile is already filled
        }

        // Extract row and column from tile id
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        // Check if the selected number is valid
        if (solutions[selectedDifficulty][r][c] == numSelected.id) {
            // If valid, place the number in the tile
            this.innerText = numSelected.id;
            // Clear any previous errors
            errors = 0;
            document.getElementById("errors").innerText = errors + "/3";
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors + "/3";

            if (errors >= 3) {
                handleGameOver(); 
            }
        }
    }
}

function handleGameOver() {
    alert("Game over! You've reached the maximum number of errors.");
}
setGame();

// Function to solve Sudoku using backtracking
function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        // All cells are filled, Sudoku is solved
        return true;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
                return true;
            }

            board[row][col] = 0; // Reset the cell if the current number doesn't lead to a solution
        }
    }

    return false; // No solution found
}

// Function to find an empty cell in the board
function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null; // If no empty cell is found
}

// Function to check if a move is valid
function isValidMove(board, row, col, num) {
    return (
        isRowValid(board, row, num) &&
        isColValid(board, col, num) &&
        isBoxValid(board, row - (row % 3), col - (col % 3), num)
    );
}

// Function to check if a number is valid in a row
function isRowValid(board, row, num) {
    for(let i=0;i<9;i++){
        if(board[row][i] === num){
            return false;
        }
    }
    return true;
}

// Function to check if a number is valid in a column
function isColValid(board, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    return true;
}

// Function to check if a number is valid in a 3x3 box
function isBoxValid(board, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[startRow + row][startCol + col] === num) {
                return false;
            }
        }
    }
    return true;
}


// Function to display the Sudoku solution
function displaySolution() {
    // Copy the original board to avoid modifying it
    const solvedBoard = JSON.parse(JSON.stringify(board));

    if (solveSudoku(solvedBoard)) {
        // The Sudoku is solved, update the display
        const solutionDisplay = document.getElementById("solution-display");
        solutionDisplay.innerHTML = formatSolution(solvedBoard);
    } else {
        // No solution found
        const solutionDisplay = document.getElementById("solution-display");
        solutionDisplay.innerHTML = "No solution found.";
    }
}

// Function to format and display the solution
function formatSolution(solutionBoard) {
    let solutionHTML = "<table>";

    for (let i = 0; i < solutionBoard.length; i++) {
        solutionHTML += "<tr>";
        for (let j = 0; j < solutionBoard[i].length; j++) {
            solutionHTML += `<td>${solutionBoard[i][j]}</td>`;
        }
        solutionHTML += "</tr>";
    }

    solutionHTML += "</table>";

    return solutionHTML;
}

// Add event listener for the "View Solution" button
const viewSolutionBtn = document.getElementById("view-solution-btn");
viewSolutionBtn.addEventListener("click", function () {
    displaySolution(); // Display the solution when the button is clicked
});


