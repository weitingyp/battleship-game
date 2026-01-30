import { Ship, Gameboard, Player } from "./model.js";
import { renderGameboard } from "./view.js";
import "./styles.css";

let testState = [
	[1, 1, 1, -1, 2],
	[2, 2, 2, -2, 2],
	[2, 2, 2, 2, 2],
	[2, 1, 2, -2, 2],
	[2, 1, 2, 2, 2],
];

const player1GameboardContainer = document.querySelector("#player-one-board");

renderGameboard(testState, player1GameboardContainer);
