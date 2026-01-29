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

export { Ship };
