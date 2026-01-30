class Ship {
	#length;
	#hits;

	constructor(length = 3) {
		// default ship length is 3
		this.#length = length;
		this.#hits = 0;
	}

	get hits() {
		return this.#hits;
	}

	hit() {
		++this.#hits;
	}

	isSunk() {
		return this.#length === this.#hits;
	}
}

class Gameboard {
	#state; // 2D array representing Values:
	// -1 - hit ship,
	// 1 - ship,
	// -2 - missed hot,
	// 2 - empty but no shot

	constructor(row = 10, col = 10) {
		this.#state = Array.from({ length: row }, () =>
			Array.from({ length: col }, () => 2),
		); // initialize gameboard
	}

	get state() {
		return this.#state;
	}

	placeShip(x, y, orientation, length) {
		if (orientation === "vertical") {
			if (y - 1 + length > this.#state.length)
				throw new Error("Ship does not fit vertically");
			for (let i = x - 1; i < x - 1 + length; i++) {
				this.#state[i][y - 1] = 1;
			}
		} else if (orientation === "horizontal") {
			if (x - 1 + length > this.#state.length)
				throw new Error("Ship does not fit horizontally");
			for (let j = y - 1; j < y - 1 + length; j++) {
				this.#state[x - 1][j] = 1;
			}
		}
	}

	receiveAttack(x, y) {
		if (this.#state[x - 1][y - 1] < 0) {
			throw new Error("already attacked before!");
		} else {
			this.#state[x - 1][y - 1] = this.#state[x - 1][y - 1] * -1;
		}
	}

	isSunk() {
		return !this.#state.some((row) => row.includes(1));
	}
}

class Player {
	#gameboard;
	constructor(type = "real") {
		this.type = type;
		this.#gameboard = new Gameboard();
	}

	get gameboard() {
		return this.#gameboard.state;
	}
}

class Game {
	#currPlayer;
	#nextPlayer;

	constructor(versus = "computer") {
		this.#currPlayer = new Player();
		if (versus === "computer") this.#nextPlayer = new Player("computer");
	}
}

export { Ship, Gameboard, Player };
