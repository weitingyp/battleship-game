import { Ship, Gameboard, Player } from "./model.js";

describe("Testing Ship class", () => {
	test("ships should have a hit() function that increases the number of hits in ship", () => {
		let ship = new Ship();
		ship.hit();
		expect(ship.hits).toBe(1);
	});

	test(`isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.`, () => {
		let length = 2;
		let ship = new Ship(2);
		for (let _ = 0; _ < length; _++) {
			ship.hit();
		}
		expect(ship.isSunk()).toEqual(true);
	});
});

describe("Testing Gameboard class", () => {
	let gameboardDimension;
	let gameboard;
	let state;

	beforeEach(() => {
		gameboardDimension = 10;
		gameboard = new Gameboard();
		state = Array.from({ length: gameboardDimension }, () =>
			Array.from({ length: gameboardDimension }, () => 2),
		);
	});

	test(`initialized state: .state should return array of gameboard
    , with x,y coordinates corresponding to x-1 and y-1 indices
    of a 2D array. Values: 
    -1 - hit ship,
    1 - ship,
    -2 - missed hot,
    2 - empty but no shot`, () => {
		expect(gameboard.state).toEqual(state);
	});

	test(`placeShip(ship, x,y,orientation ) should place a ship at (x,y) in horizontal/vertical orientation`, () => {
		let length = 3;
		let [ship, x, y, orientation] = [new Ship(length), 1, 1, "horizontal"];
		gameboard.placeShip(ship, x, y, orientation);

		// mark where the ship is
		if (orientation === "vertical") {
			for (let i = x - 1; i < x - 1 + length; i++) {
				state[i][y - 1] = 1;
			}
		} else if (orientation === "horizontal") {
			for (let j = y - 1; j < y - 1 + length; j++) {
				state[x - 1][j] = 1;
			}
		}

		expect(gameboard.state).toEqual(state);
	});

	test(`placeShip(ship, x,y,orientation) should return 0 when ship is tried to be placed out of bounds / none empty space`, () => {
		let length = 3;
		let [ship, x, y, orientation] = [new Ship(length), 20, 20, "horizontal"];
		const res = gameboard.placeShip(ship, x, y, orientation);
		expect(res).toBe(0);
	});

	test(`receiveAttack(x,y) should hit a ship if present at x,y,
     or record missed hit otherwise`, () => {
		let length = 3;
		let [ship, x, y, orientation] = [new Ship(length), 1, 1, "vertical"];
		gameboard.placeShip(ship, x, y, orientation);
		gameboard.receiveAttack(2, 2);
		gameboard.receiveAttack(1, 1);

		// mark where the ship is
		if (orientation === "vertical") {
			for (let i = x - 1; i < x - 1 + length; i++) {
				state[i][y - 1] = 1;
			}
		} else if (orientation === "horizontal") {
			for (let j = y - 1; j < y - 1 + length; j++) {
				state[x - 1][j] = 1;
			}
		}
		// mark missed hit -2 and sunk ship -1
		state[1][1] = -2;
		state[0][0] = -1;
		expect(gameboard.state).toEqual(state);
	});

	test(`receiveAttack(x,y) should hit a ship if present at x,y,
     or record missed hit otherwise`, () => {
		let length = 3;
		let [ship, x, y, orientation] = [new Ship(length), 1, 1, "vertical"];
		gameboard.placeShip(ship, x, y, orientation);
		gameboard.receiveAttack(2, 2);
		gameboard.receiveAttack(1, 1);

		expect(ship.hits).toEqual(1);
	});

	test(`isSunk() should return boolean value of weather all ships
    on the board have been sunk - not sunken`, () => {
		let length = 3;
		let [ship, x, y, orientation] = [new Ship(length), 1, 1, "vertical"];
		gameboard.placeShip(ship, x, y, orientation);
		gameboard.receiveAttack(2, 2);
		gameboard.receiveAttack(1, 1);
		expect(gameboard.isSunk()).toBe(false);
	});

	test(`isSunk() should return boolean value of weather all ships
    on the board have been sunk - sunken`, () => {
		let [x, y, orientation, length] = [1, 1, "vertical", 1];
		gameboard.placeShip(x, y, orientation, length);
		gameboard.receiveAttack(1, 1);
		expect(gameboard.isSunk()).toBe(true);
	});
});

describe("Testing Player class", () => {
	test(`Player.gameboard should return gameboard state of each player instance`, () => {
		let player = new Player("computer");
		expect(player.gameboard).toEqual(new Gameboard());
	});
});
