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
        expect(gameboard.state).toEqual(Array.from({length:15}, () => Array.from({length:15}, () => 2)));
})