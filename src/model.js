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

	constructor(row, col) {
		this.#state = Array.from({ length: row }, () =>
			Array.from({ length: col }, () => 2),
		); // initialize gameboard
	}

	get state() {
		return this.#state;
	}

	placeShip(x, y, orientation, length) {
		if (orientation === "vertical") {
			for (let i = x - 1; i < x + length; i++) {
				this.#state[i][y] = 1;
			}
		} else if (orientation === "horizontal") {
			for (let j = y - 1; y < j + length; j++) {
				this.#state[x][j] = 1;
			}
		}
		console.log(this.#state);
	}
}

export { Ship, Gameboard };
