//initializeState initializes various state variables upon start-up.
//In production mode, most of these should be populated from a configuration
//file or a random generator.


function initializeState() {
	//alert("Initializing!");
	document.forms[1].location.value = "1,1";
	document.forms[1].energy.value = configuration[1].value;
	document.forms[1].supplies.value = configuration[2].value
	document.forms[1].credits.value = configuration[5].value;
	document.forms[1].message.value = "[NULL]";
	document.forms[1].mapSizeX.value = configuration[0].value.x;
	document.forms[1].mapSizeY.value =  configuration[0].value.y;

}


//makeMove passes the player move and various state values to the game engine,
//then receives the response and updates the various fields on the web page

function makeMove(direction) {

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
	if (x <= 0 || x > configuration[0].value.x )
	{
		if (configuration[3].value === wormhole_behavior.goto_fixed_CP) {
			x = configuration[0].value.x ;

        } else {
            x = getRandomInt(configuration[0].value.x);
        }
		document.forms[1].message.value = item = "You've flown into a wormhole! You've been transported to a different location...";
	}
	else 
	if (y <= 0 || y > configuration[0].value.y) {
        if (configuration[3].value === wormhole_behavior.goto_fixed_CP) {
			y =  configuration[0].value.y ;
        } else {
            y = getRandomInt(configuration[0].value.y);
        }
		document.forms[1].message.value = item = "You've flown into a wormhole! You've been transported to a different location...";
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

	checkLocation();
	document.forms[1].location.value = x.toString() + "," + y.toString();


	// update the fields on the web page with the results
	document.forms[1].energy.value -= 10 * parseInt(document.forms[0].distance.value);

	if (configuration[4].value && document.forms[1].energy.value <= 0)
		document.forms[1].energy.value = 0;


	document.forms[1].supplies.value -= 2 * parseInt(document.forms[0].distance.value)// Two percent for later: (document.forms[1].supplies.value * 0.02);
	
	checkStatus() // should this function contain the code below?
	if (document.forms[1].energy.value <= 0 && configuration[4].value === false) {
		alert("Game Over! You ran out of energy!");
		setTimeout("location.reload(true);", 500); // Half a second after clearing alert the page will refresh.
	} else if (document.forms[1].supplies.value <= 0) {
		alert("Game Over! You ran out of supplies!");
		setTimeout("location.reload(true);", 500); // Half a second after clearing alert the page will refresh.
	}
	renderMap.moveSpaceShip(x,configuration[0].value.y - y+1, parseInt(direction));
}


function getRandomInt(max) {
	return 1 + Math.floor(Math.random() * max);
}

