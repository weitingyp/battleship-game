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
			for (let i = x - 1; i < x - 1 + length; i++) {
				this.#state[i][y - 1] = 1;
			}
		} else if (orientation === "horizontal") {
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

export { Ship, Gameboard };
