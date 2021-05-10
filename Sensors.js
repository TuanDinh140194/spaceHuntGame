var sensorsButton = document.createElement("button");
sensorsButton.innerHTML = "Deploy Sensors";
document.body.appendChild(sensorsButton);

const Planets = 1
const Asteroids = 2
const SpaceStations = 3
const Wormholes = 4

sensorsButton.addEventListener("click", function () {
    document.forms[1].supplies.value -= Math.round(document.forms[1].supplies.value * 0.02); // decrease supplies by two percent

    let coords = document.forms[1].location.value.split(',');
    let x = Number(coords[0]);
    let y = Number(coords[1]);
    const detected = [...Array(SIZE)].map(_ => Array(SIZE).fill(0))
    var found = false; // found something

    for (let j = x-2; j <= x+2; j++) {
        if (j < 0 || j >= SIZE) { // don't try sensing coordinates that are out of bounds
            continue;
        }
        for (let i = y-2; i <= y+2; i++) {
            if (i < 0 || i >= SIZE) {
                continue;
            }
            if (celestial[i][j] != 0) {
                //detected[i][j] = celestial[i][j];
                found = true;

                if (celestial[i][j] == Planets) {
                    alert("Detected: Planet at " + parseInt(j+1) + "," + parseInt(i+1) );
                }
                else if (celestial[i][j] == Asteroids) {
                    alert("Detected: Asteroid at " + parseInt(j+1) + "," + parseInt(i+1) );
                }
                else if (celestial[i][j] == SpaceStations) {
                    alert("Detected: SpaceStation at " + parseInt(j+1) + "," + parseInt(i+1));
                }
                else if (celestial[i][j] == Wormholes) {
                    alert("Detected: Wormhole at " + parseInt(j+1) + "," + parseInt(i+1));
                }

            }
        }
    }
//    if (found) {
//        let table = '';
//        for (let i = 0; i < SIZE; i++){
//            for(let j = 0; j < SIZE; j++){
//                table += (detected[i][j]) + "|"
//            }
//            table += '\n'
//        }
//        console.log('\n\n' + table);
//    }
  
    if (!found) {
        alert("Sensors deployed: nothing detected");
    }
});
