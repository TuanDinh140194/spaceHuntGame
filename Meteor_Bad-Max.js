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
			// Getting the value 23 has the 1 in 50 chance to encounter a meteor storm in free space.
			if (Math.round(Math.random() * 50) == 23) {
				// Meteor Storm occurred, so now the ship is damaged.
				if (document.forms[1].shipStatus.value == "Fully Operational") {
					document.forms[1].shipStatus.value = "Damaged";
					alert("You've encountered a meteor storm and as a result your ship is damaged and needs to be fixed at a repair depot!\n(Energy is consumed at 5 times its normal rate)");
					return;
				}
			}
			// Getting the value 3 has the 1 in mapSizeX chance to encounter Bad Max and his crew in free space.
			// if (true) { FOR TESTING QUICKLY
			if (Math.round(Math.random() * document.forms[1].mapSizeX.value) == 3) {
				// One of three possibilities
				var chanceVar = Math.round(Math.random() * 2);
				if (chanceVar == 0) {
					document.forms[1].message.value = "Bad Max Encountered! [Loss - Crew Death]";
					gameOver("You and your crew have encountered Bad Max and his henchmen who know you're in search of the Koca-Kola recipe he stole!\nDespite your best efforts, you along with your crew have been killed..");
				}
				else if (chanceVar == 1) {
					document.forms[1].message.value = "Bad Max Encountered! [Victory - No Damage]";
					alert("You and your crew have encountered Bad Max and his henchmen who know that you're in search of the Koca-Kola recipe he stole!\nHe attempted to board your ship and kill your crew, but with clever tactics and quick maneuvering you've safely escaped!");
				}
				else {
					document.forms[1].message.value = "Bad Max Encountered! [1/2 Supplies 0 Credits]";
					document.forms[1].credits.value = 0;
					document.forms[1].supplies.value = Math.round(document.forms[1].supplies.value / 2);
					alert("You and your crew have encountered Bad Max and his henchmen who know that you're in search of the Koca-Kola recipe he stole!\nThey managed to board your ship, overcome your crew, steal all your credits and half of the supplies!");
				}
			}
		}
	})
});