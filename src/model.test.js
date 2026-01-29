import { Ship, Gameboard } from "./model.js";

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

test(`initialized state: .state should return array of gameboard
    , with x,y coordinates corresponding to x-1 and y-1 indices
    of a 2D array. Values: 
    -1 - hit ship,
    1 - ship,
    -2 - missed hot,
    2 - empty but no shot`, () => {
	let gameboard = new Gameboard(15, 15);
	expect(gameboard.state).toEqual(
		Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => 2)),
	);
});

test(`placeShip(x,y,orientation, length = 3) should place a ship at (x,y) in horizontal/vertical orientation`, () => {
	let gameboardDimension = 5;
	let gameboard = new Gameboard(5, 5);
	let [x, y, orientation, length] = [1, 1, "horizontal", 3];
	gameboard.placeShip(x, y, orientation, length);

	// initialize state
	let state = Array.from({ length: gameboardDimension }, () =>
		Array.from({ length: gameboardDimension }, () => 2),
	);
	// mark where the ship is
	if (orientation === "vertical") {
		for (let i = x - 1; i < x + length; i++) {
			state[i][y-1] = 1;
		}
	} else if (orientation === "horizontal") {
		for (let j = y - 1; j < y + length; j++) {
			state[x-1][j] = 1;
		}
	}

	expect(gameboard.state).toEqual(state);
});

test(`receiveAttack(x,y) should hit a ship if present at x,y,
     or record missed hit otherwise`, () => {
	let gameboardDimension = 5;
	let gameboard = new Gameboard(5, 5);
	let [x, y, orientation, length] = [1, 1, "vertical", 3];
	gameboard.placeShip(x, y, orientation, length);
	gameboard.receiveAttack(2, 2);
	gameboard.receiveAttack(1, 1);

	// initialize state
	let state = Array.from({ length: gameboardDimension }, () =>
		Array.from({ length: gameboardDimension }, () => 2),
	);
	// mark where the ship is
	if (orientation === "vertical") {
		for (let i = x - 1; i < x + length; i++) {
			state[i][y-1] = 1;
		}
	} else if (orientation === "horizontal") {
		for (let j = y - 1; j < y + length; j++) {
			state[x-1][j] = 1;
		}
	}
	// mark missed hit -2 and sunk ship -1
	state[1][1] = -2;
	state[0][0] = -1;
	expect(gameboard.state).toEqual(state);
});
