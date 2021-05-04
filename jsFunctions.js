//initializeState initializes various state variables upon start-up.
//In production mode, most of these should be populated from a configuration
//file or a random generator.

<!---->
function initializeState()
{
    alert("Initializing!");
    document.forms[1].location.value="0,0";
    document.forms[1].energy.value=1000;
    document.forms[1].supplies.value=100.00
    document.forms[1].credits.value=1000;
    document.forms[1].message.value="[NULL]";
	document.forms[1].mapSizeX.value=128;
	document.forms[1].mapSizeY.value=128;
}


//makeMove passes the player move and various state values to the game engine,
//then receives the response and updates the various fields on the web page

<!---->
function makeMove(direction)
{

        var coords = document.forms[1].location.value.split(',');
        var x = Number(coords[0]);
        var y = Number(coords[1]);

        switch(direction)
        {
                case '0':
                        if (x >= document.forms[1].mapSizeX.value) {
							x = 0; // Reset via wormhole behavior.
						}
						else {x += parseInt(document.forms[0].distance.value);}
                        break;
                case '90':
						if (y >= document.forms[1].mapSizeY.value) {
							y = 0; // Reset via wormhole behavior.
						}
						else {y += parseInt(document.forms[0].distance.value);}
                        break;
                case '180':
						if (x < 1) {
							x = 128; // Wormhole to other side of h-plane
						}
						else {x -= parseInt(document.forms[0].distance.value);}
                        break;
                case '270':
						if (y < 1) {
							y = 128; // Wormhole to other side of v-plane
						}
						else {y -= parseInt(document.forms[0].distance.value);}
                        break;
        }

<<<<<<< HEAD
<!---->
function checkLocation() {
    document.forms[1].location.value = x.toString() + "," + y.toString();
=======
>>>>>>> parent of d6d7e6c (Add files via upload)

	checkLocation()
        document.forms[1].location.value = x.toString() + "," + y.toString();


<<<<<<< HEAD
<!---->
function checkStatus() {
	//Checks if ship still has energy and supplies to continue playing the game.
	//If either run out, should alert the player, signifying end of game.
	//Function should only run if gamemode is set to "regular play".
	if (document.forms[1].energy.value <= 0) {
		alert("Game Over! You ran out of energy!");
		setTimeout("location.reload(true);", 500); // Half a second after clearing alert the page will refresh.
	}
	
	else if (document.forms[1].supplies.value <= 0) {
		alert("Game Over! You ran out of supplies!");
		setTimeout("location.reload(true);", 500); // Half a second after clearing alert the page will refresh.
	}
=======
        // update the fields on the web page with the results
		document.forms[1].energy.value -= 10 * parseInt(document.forms[0].distance.value);
		document.forms[1].supplies.value -= 2 * parseInt(document.forms[0].distance.value)// Two percent for later: (document.forms[1].supplies.value * 0.02);
		switch(direction){
			case '0':
				document.forms[1].message.value=item = "Moving Eastbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
			case '90':
				document.forms[1].message.value=item = "Moving Northbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
			case '180':
				document.forms[1].message.value=item = "Moving Westbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
			case '270':
				document.forms[1].message.value=item = "Moving Southbound " + parseInt(document.forms[0].distance.value) + " time(s).";
				break;
		}
		
	checkStatus()
		//Checks if ship still has energy and supplies to continue playing the game.
		//If either run out, should alert the player, signifying end of game.
		//Function should only run if gamemode is set to "regular play".
		if (document.forms[1].energy.value <= 0){
			alert("Game Over! You ran out of energy!");
			setTimeout("location.reload(true);", 500); // Half a second after clearing alert the page will refresh.
		}else if (document.forms[1].supplies.value <= 0){
			alert("Game Over! You ran out of supplies!");
			setTimeout("location.reload(true);", 500); // Half a second after clearing alert the page will refresh.
		}
>>>>>>> parent of d6d7e6c (Add files via upload)
}
