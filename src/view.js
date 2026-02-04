function renderGameboard(gameboardArray, container) {
	// given a 2D array, render the gameboard
	container.innerHTML = "";
	let gameboard = document.createElement("div");
	gameboard.className = "gameboard";
	for (let i = 0; i < gameboardArray.length; i++) {
		let row = document.createElement("div");
		row.className = "gameboard-row";
		for (let j = 0; j < gameboardArray.length; j++) {
			let cell = document.createElement("div");
			cell.classList.add("cell");
			cell.setAttribute("data-coordinates", `{"coords":[${i},${j}]}`);
			if (gameboardArray[i][j] > 0) cell.classList.add("unknown-cell");
			else if (gameboardArray[i][j] === -2) markEmptyCell(cell);
			else if (gameboardArray[i][j] === -1) markSunkenCell(cell);
			row.appendChild(cell);
		}
		gameboard.appendChild(row);
	}
	container.appendChild(gameboard);
}

function markEmptyCell(cellNode) {
	cellNode.classList.remove("unknown-cell");
	cellNode.classList.add("empty-cell");
	const circle = document.createElement("div");
	circle.className = "empty-circle";
	cellNode.appendChild(circle);
}

function markSunkenCell(cellNode) {
	cellNode.classList.remove("unknown-cell");
	cellNode.classList.add("sunken-cell");
}

export { renderGameboard };
