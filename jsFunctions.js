//initializeState initializes various state variables upon start-up.
//In production mode, most of these should be populated from a configuration
//file or a random generator.


function initializeState() {
	//alert("Initializing!");
	document.forms[1].location.value = "1,1";
	document.forms[1].shipStatus.value = "Fully Operational";
	document.forms[1].energy.value = configuration[1].value;
	document.forms[1].supplies.value = configuration[6].value
	document.forms[1].credits.value = configuration[2].value;
	document.forms[1].message.value = "[NULL]";
	document.forms[1].mapSizeX.value = configuration[0].value.x;
	document.forms[1].mapSizeY.value = configuration[0].value.y;

}


//makeMove passes the player move and various state values to the game engine,
//then receives the response and updates the various fields on the web page

function makeMove(direction) {
	let stepByStep = true; //true for walking step by step; false for wormhole behavior

	let coords = document.forms[1].location.value.split(',');
	let x = Number(coords[0]);
	let y = Number(coords[1]);

	switch (direction) {
		case '0':
			// if (x >= document.forms[1].mapSizeX.value) {
			// 	x = 0 + (parseInt(document.forms[0].distance.value) - 1); // Reset via wormhole behavior.
			// }
			// else 
			{ x += parseInt(document.forms[0].distance.value); }
			break;
		case '90':
			// if (y >= document.forms[1].mapSizeY.value) {
			// 	y = 0 + (parseInt(document.forms[0].distance.value) - 1); // Reset via wormhole behavior.
			// }
			// else 
			{ y += parseInt(document.forms[0].distance.value); }
			break;
		case '180':
			// if (x < 1) {
			// 	x = parseInt(document.forms[1].mapSizeX.value) - (parseInt(document.forms[0].distance.value) - 1); // Wormhole to other side of h-plane
			// }
			// else 
			{ x -= parseInt(document.forms[0].distance.value); }
			break;
		case '270':
			// if (y < 1) {
			// 	y = parseInt(document.forms[1].mapSizeY.value) - (parseInt(document.forms[0].distance.value) - 1); // Wormhole to other side of v-plane
			// }
			// else 
			{ y -= parseInt(document.forms[0].distance.value); }
			break;
	}

	//wormhole behavior 
	if ((x <= 0 || x > configuration[0].value.x) || (y <= 0 || y > configuration[0].value.y)) {
		var [x_new, y_new] = wormholeBehavior(x, y);
		x = x_new;
		y = y_new;
		stepByStep = false;
	}
	else {
		switch (direction) {
			case '0':
				document.forms[1].message.value = item = "Moving Eastbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
			case '90':
				document.forms[1].message.value = item = "Moving Northbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
			case '180':
				document.forms[1].message.value = item = "Moving Westbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
			case '270':
				document.forms[1].message.value = item = "Moving Southbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
		}
	}

	document.forms[1].location.value = x.toString() + "," + y.toString();


	// update the fields on the web page with the results

	//if (!configuration[5].value && document.forms[1].supplies.value <= 0) // don't let supplies go below zero
	//  document.forms[1].supplies.value = 0;

    if (document.forms[1].shipStatus.value == "Fully Operational") {
		document.forms[1].energy.value -= 10 * parseInt(document.forms[0].distance.value);
	} else { // The ship is damaged and therefore consumes energy at 5x the normal rate until repaired.
		document.forms[1].energy.value -= 5 * (10 * parseInt(document.forms[0].distance.value));
	}	

	document.forms[1].supplies.value -= Math.round(document.forms[1].supplies.value * 0.02 + 0.49); // decrease supplies by two percent (round up)

	if (document.forms[1].energy.value <= 0 && configuration[5].value === false) { // check if energy is below 1 and Never Die is off
		gameOver("You ran out of energy!");
		
	} else if (document.forms[1].supplies.value <= 0 && configuration[5].value === false) { // check if supplies are below 1 and Never Die is off
		gameOver("You ran out of supplies!");

	}

	renderMap.moveSpaceShip(x, y , parseInt(direction), stepByStep);
}

function wormholeBehavior(x, y) {
	//wormhole behavior 
	if (configuration[3].value === wormhole_behavior.goto_fixed_CP) {
		x = configuration[4].value.x;
		y = configuration[4].value.y;

	} else {
		x = getRandomInt(configuration[0].value.x);
		y = getRandomInt(configuration[0].value.y);
	}
	document.forms[1].message.value = item = "You've flown into a wormhole! You've been transported to a different location...";
	alert("You've flown into a wormhole! You've been transported to a different location...");
	return [x, y];
}





