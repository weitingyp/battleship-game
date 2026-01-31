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

	get length(){
		return this.#length;
	}

	hit() {
		++this.#hits;
	}

	isSunk() {
		return this.#length === this.#hits;
	}
}

class Gameboard {
	// 2D array representing Values:
	// -1 - hit ship,
	// 1 - ship,
	// -2 - missed hot,
	// 2 - empty but no shot

	constructor(row = 10, col = 10) {
		this.state = Array.from({ length: row }, () =>
			Array.from({ length: col }, () => 2),
		); // initialize gameboard
	}

	placeShip(x, y, orientation, length) {
		let resetState = this.state;

		try {
			if (orientation === "vertical") {
				if (y - 1 + length > this.state.length)
					throw new Error("Ship does not fit vertically");
				for (let i = x - 1; i < x - 1 + length; i++) {
					if (this.state[i][y - 1] == 1)
						throw new Error("There's already a ship here");
					this.state[i][y - 1] = 1;
				}
			} else if (orientation === "horizontal") {
				if (x - 1 + length > this.state.length)
					throw new Error("Ship does not fit horizontally");
				for (let j = y - 1; j < y - 1 + length; j++) {
					if (this.state[x - 1][j] == 1)
						throw new Error("There's already a ship here");
					this.state[x - 1][j] = 1;
				}
			}
			return 1;
		} catch (error) {
			this.state = resetState;
			console.log(error.message);
			return 0;
		}
	}

	receiveAttack(x, y) {
		if (this.state[x - 1][y - 1] < 0) {
			throw new Error("already attacked before!");
		} else {
			this.state[x - 1][y - 1] = this.state[x - 1][y - 1] * -1;
		}
	}

	isSunk() {
		return !this.state.some((row) => row.includes(1));
	}
}

class Player {
	constructor(type = "real") {
		this.type = type;
		this.gameboard = new Gameboard();
	}
}

class Game {
	currPlayer;
	nextPlayer;

	constructor(versus = "computer") {
		this.currPlayer = new Player();
		if (versus === "computer") this.nextPlayer = new Player("computer");
		this.ships = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
	}

	randomizeShipPos(ship){
		const orientation = Math.round(Math.random()) === 1 ? 'horizontal' : 'vertical';
		const length = ship.length;
		const gameboardDimension = this.currPlayer.gameboard.state.length;
		const x = Math.ceil(gameboardDimension*Math.random());
		const y = Math.ceil(gameboardDimension*Math.random());
		return [x, y, orientation, length];
	}

	randomizeGameboard(player){
		// randomize gameboard for player
		for ( const ship of this.ships ){
			while ( !player.gameboard.placeShip(...this.randomizeShipPos(ship)) ) continue;
		}
	}
}

export { Ship, Gameboard, Player, Game};
