/* Shows the player planets, asteroids, space-stations, and wormholes that are located within 2 Celestial Points in both directions
 *
 */

var sensorsButton = document.createElement("button");
sensorsButton.innerHTML = "Deploy Sensors";
document.body.appendChild(sensorsButton);

sensorsButton.addEventListener("click", function () {
    document.forms[1].supplies.value -= Math.round(document.forms[1].supplies.value * 0.02 + 0.49); // decrease supplies by two percent (round up)

    let coords = document.forms[1].location.value.split(',');
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    SIZE1 = document.getElementById("mapSizeX").value;
    SIZE2 = document.getElementById("mapSizeY").value;
    var found = false; // found something

    for (let j = x-2; j <= x+2; j++) {
        if (j <= 0 || j > SIZE1) { // don't try sensing coordinates that are out of bounds
            continue;
        }
        for (let i = y-2; i <= y+2; i++) {
            if (i <= 0 || i > SIZE2) { // don't try sensing coordinates that are out of bounds
                continue;
            }
            cell = $id("cell-" + j + "-"+ i);
            if(cell != null) {
                type = cell.getAttribute("type"); 
                found = true;
                cell.style.display = "block"; // display found item on map

                if (type == "planet") {
                    alert("Detected: Planet at " + j + "," + i);
                }
                else if (type == "asteroid") {
                    alert("Detected: Asteroid at " + j + "," + i);
                }
                else if (type == "space-station") {
                    alert("Detected: SpaceStation at " + j + "," + i);
                }
                else if (type == "wormhole") {
                    alert("Detected: Wormhole at " + j + "," + i);
                }
                else if (type == "recipe") {
                    alert("Detected: Recipe at " + j + "," + i);
                }
                else if (type == "freighter") {
                    alert("Detected: Abandoned Freighter at " + j + "," + i);
                }
                else {
                    alert("Detected: " + type + " at " + j + "," + i);
                }
            }
        }
    }
  
    if (!found) {
        alert("Sensors deployed: nothing detected");
    }
});
