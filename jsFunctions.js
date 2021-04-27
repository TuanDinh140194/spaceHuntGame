//initializeState initializes various state variables upon start-up.
//In production mode, most of these should be populated from a configuration
//file or a random generator.

<!---->
function initializeState()
{
        alert("Initializing!");
        document.forms[0].location.value="0,0";
        document.forms[0].energy.value=1000;
        document.forms[0].supplies.value=100.00
        document.forms[0].credits.value=1000;
        document.forms[0].message.value="[NULL]";

}


//makeMove passes the player move and various state values to the game engine,
//then receives the response and updates the various fields on the web page

<!---->
function makeMove(direction)
{

        var coords = document.forms[0].location.value.split(',');
        var x = Number(coords[0]);
        var y = Number(coords[1]);

        switch(direction)
        {
                case '0':
                        x += 1;
                        break;
                case '90':
                        y += 1;
                        break;
                case '180':
                        x -= 1;
                        break;
                case '270':
                        y -= 1;
                        break;
        }


	checkLocation()
        document.forms[0].location.value = x.toString() + "," + y.toString();


                          // update the fields on the web page with the results
        document.forms[0].energy.value -= 10;
        document.forms[0].supplies.value -= 2;
        document.forms[0].message.value=item = "Movement Detected";
	checkStatus();
}