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
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    SIZE1 = document.getElementById("mapSizeX").value
    SIZE2 = document.getElementById("mapSizeY").value
    let ycel = SIZE2;
    const detected = [...Array(SIZE)].map(_ => Array(SIZE).fill(0))
    var found = false; // found something

    for (let j = x-3; j <= x+1; j++) {
        if (j < 0 || j >= SIZE1) { // don't try sensing coordinates that are out of bounds
            continue;
        }
        for (let i = y-3; i <= y+1; i++) {
            if (i < 0 || i >= SIZE2) {
                continue;
            }
            ycel = SIZE2 - i - 1; // the y index of celestial array goes from top to bottom
            //cell = $id("cell-" + j + "-"+ i);
            //if(cell != null) {
            //    type = cell.getAttribute("type") + j + " , " + i;
            //}
            if (celestial[ycel][j] != 0) {
                //detected[i][j] = celestial[i][j];
                found = true;

                if (celestial[ycel][j] == Planets) {
                    alert("Detected: Planet at " + parseInt(j+1) + "," + parseInt(i+1));
                }
                else if (celestial[ycel][j] == Asteroids) {
                    alert("Detected: Asteroid at " + parseInt(j+1) + "," + parseInt(i+1));
                }
                else if (celestial[ycel][j] == SpaceStations) {
                    alert("Detected: SpaceStation at " + parseInt(j+1) + "," + parseInt(i+1));
                }
                else if (celestial[ycel][j] == Wormholes) {
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
