import { Ship } from "./model.js";

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
