/* 
 * Adds the possibility that either a meteor storm, or an encounter with Bad Max can happen
 * if there isn't an object already on that CP (planet, asteroid, space-station, or wormhole).
 */


document.querySelectorAll("button.movement").forEach(item => {
	item.addEventListener("click", function () {
		let coords = document.forms[1].location.value.split(',');
		const x = Number(coords[0]);
		const y = Number(coords[1]);
		var cell = $id("cell-" + x + "-" + y);
		if (cell == null) { // The current cell is free space, so an encounter can occur.
			// Getting the value 3 has the 1 in 35 chance to encounter a meteor storm in free space.
			if (Math.round(Math.random() * 35) == 3) {
				// Meteor Storm occurred, so now the ship is damaged.
				if (document.forms[1].shipStatus.value == "Fully Operational") {
					document.forms[1].shipStatus.value = "Damaged";
					alert("You've encountered a meteor storm and as a result your ship is damaged and needs to be fixed at a repair depot!\n(Energy is consumed at 5 times its normal rate)");
				}
			}
		}
	})
});