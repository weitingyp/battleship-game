import { Ship, Gameboard, Player, Game } from "./model.js";
import { renderGameboard } from "./view.js";
import "./styles.css";

// nextPlayerContainer tracks index of gameboard under attack
// gameboardContainers is an array of the two gameboard containers
let nextPlayerContainer = true;
const gameboardContainers = [
	document.querySelector("#player-one-board"),
	document.querySelector("#player-two-board"),
];
const gameboardContainersId = ["#player-one-board", "#player-two-board"];
const playerNamesContainers = [document.querySelector("#player-one-name"), document.querySelector("#player-two-name")];

// initialize the game
const game = new Game();
game.randomizeGameboard(game.currPlayer);
game.randomizeGameboard(game.nextPlayer);
renderGameboard(game.currPlayer.gameboard.state, gameboardContainers[0]);
renderGameboard(game.nextPlayer.gameboard.state, gameboardContainers[1]);

// initCells adds click event listener to every cell
function initCells() {
	const cells = document.querySelectorAll(
		gameboardContainersId[+nextPlayerContainer] + " .cell.unknown-cell",
	);
	for (const cell of cells) {
		cell.classList.add("active");
		cell.addEventListener("click", attackCell);
	}
}
initCells();

// for each cell clicked, attack the next player's gameboard
// 1. game.playTurn attacks the next player's gameboard
// 2. renderGameboard re-renders the next player's gameboard
// 3. turnover switches turns
// 4. initCells adds event listeners to the new next player's cells again
// 5. updateTurnIndicator renders new current player's turn

function attackCell(event) {
	const cell = event.target;
	const [i, j] = JSON.parse(cell.getAttribute("data-coordinates")).coords;
	game.playTurn(i, j);
	renderGameboard(
		game.nextPlayer.gameboard.state,
		gameboardContainers[+nextPlayerContainer],
	);
	if (game.nextPlayer.gameboard.isSunk()) gameover();
	else {
		turnover();
		initCells();
		updateTurnIndicator();
		if (game.isComputerTurn())
			setTimeout(() => {
				game.playComputerTurn();
				renderGameboard(
					game.nextPlayer.gameboard.state,
					gameboardContainers[+nextPlayerContainer],
				);
				turnover();
				initCells();
				updateTurnIndicator();
			}, 750);
	}
}

function turnover() {
	// nextPlayerContainer tracks next player's container in gameboardContainers
	nextPlayerContainer = !nextPlayerContainer;
	// switches game's logic: curr and next player
	game.turnover();
}

const turnIndicator = document.querySelector("#turn-indicator");
function updateTurnIndicator() {
	turnIndicator.innerText = `It's ${game.currPlayer.name}'s turn`;
    playerNamesContainers[+nextPlayerContainer].classList.remove('curr-player');
    playerNamesContainers[+!nextPlayerContainer].classList.add('curr-player');
}

function gameover() {
	alert(`Gameover! ${game.currPlayer.name} is the winner.`);
}
