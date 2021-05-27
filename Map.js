//Tri Le
class Map {

    constructor(id, className, width, height, configuration, ship, celestial) {

        this.width = width;
        this.height = height;

        this.boundx = 0;
        this.boundy = 0;

        this.id = id;

        this.configuration = configuration;
        this.celestial = celestial;

        this.elem = document.createElement('div');
        this.elem.className = className;

        if (ship != undefined)
            this.ship = ship;

        this.sensor = document.createElement("div");
        this.sensor.style.backgroundColor = "rgb(255,255,255,0.3)"
        this.sensor.style.position = "relative";
        this.sensor.style.width = CELL_SIZE + "px";
        this.sensor.style.height = CELL_SIZE + "px";
        this.sensor.style.animation = "example";
        this.timer = null;
        this.increase = 0;
        this.delta = 1;


    }

    render() {


        this.elem.style.zIndex = "0";
        this.elem.setAttribute("id", this.id);

        if (this.ship !== undefined)
            this.elem.style.position = "fixed";

        this.elem.style.transition = "all 0.3s linear 0s";
        document.body.appendChild(this.elem);

        if (this.ship !== undefined) {
            this.elem.appendChild(this.ship.elem);

            this.elem.style.left = (window.innerWidth / 2 - this.ship.x_of_map * CELL_SIZE) + "px";
            this.elem.style.top = (window.innerHeight / 2 - this.ship.y_of_map * CELL_SIZE) + "px";
        }

        var table = document.createElement('table');
        table.style.borderCollapse = "collapse";
        table.className = "table-format";
        table.style.width = this.width * CELL_SIZE + "px";
        table.style.height = this.height * CELL_SIZE + "px";

        this.elem.appendChild(table);
        this.elem.style.backgroundColor = "black";

        for (var i = 0; i < this.height; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < this.width; j++) {
                var cell = document.createElement("td");
                cell.style.width = (CELL_SIZE) + "px";
                cell.style.height = (CELL_SIZE) + "px";
                cell.style.padding = 0;
                cell.style.margin = 0;
                cell.style.border = "1px solid red";
                cell.style.textAlign = "center";
                cell.setAttribute("id", "td-" + (j + 1) + "-" + (this.height - i));
                switch (this.celestial[i][j]) {
                    case 1: {
                        //Planet
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE - 15) + "px";
                        img.style.height = (CELL_SIZE - 15) + "px";
                        img.style.display = "none";
                        img.setAttribute("src", "img/planet.png");
                        img.setAttribute("type", "planet");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height - i));
                        cell.appendChild(img);
                    } break;
                    case 2: {
                        //asteroid
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE - 15) + "px";
                        img.style.height = (CELL_SIZE - 15) + "px";
                        img.style.display = "none";
                        img.setAttribute("src", "img/asteroid.png");
                        img.setAttribute("type", "asteroid");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height - i));
                        cell.appendChild(img);
                    } break;
                    case 3: {
                        //space-station
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE - 15) + "px";
                        img.style.height = (CELL_SIZE - 15) + "px";
                        img.style.display = "none";
                        img.setAttribute("src", "img/space-station.png");
                        img.setAttribute("type", "space-station");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height - i));
                        cell.appendChild(img);
                    } break;
                    case 4: {
                        //wormholes
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE - 15) + "px";
                        img.style.height = (CELL_SIZE - 15) + "px";
                        img.style.display = "none";
                        img.setAttribute("src", "img/wormholes.png");
                        img.setAttribute("type", "wormhole");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height - i));
                        cell.appendChild(img);
                    } break;
                    case 5: {
                        //freighters
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE - 15) + "px";
                        img.style.height = (CELL_SIZE - 15) + "px";
                        img.style.display = "none";
                        img.setAttribute("src", "img/freighter.png");
                        img.setAttribute("type", "freighter");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height - i));
                        cell.appendChild(img);
                    } break;
                }
                row.appendChild(cell);

            }
            table.appendChild(row);
        }

        this.elem.style.width = table.style.width;
        this.elem.style.height = table.style.height;



        //Calculate cell size for the first time 
        if (this.boundx === 0) {
            let cell2 = $id("td-" + 1 + "-" + 1);
            if (cell2 !== null) {
                this.boundx = cell2.getBoundingClientRect().width;
                this.boundy = cell2.getBoundingClientRect().height;
                this.ship.boundx = this.boundx;
                this.ship.boundy = this.boundy;
            }
            else {
                this.boundx = CELL_SIZE;
                this.boundy = CELL_SIZE;
            }
        }
        this.ship.setLocation(1, 1, 90);
        this.elem.style.left = (window.innerWidth / 2 - this.ship.x_of_map * this.boundx) + "px";
        this.elem.style.top = (window.innerHeight / 2 - this.ship.y_of_table * this.boundy) + "px";

    }

    getSize() {
        return { height: this.width, y: this.height };
    }

    moveSpaceShip(x, y, angle,stepByStep) {

        let artifactResult = "";
        let new_x = x;
        let new_y = y;

        x = this.ship.x_of_map;
        y = this.ship.y_of_map;
        let isMeetingWormhole = false;
        let flyOver = true; // becomes false when ship has completed move to destination point
        // i.e. fly over cells until ship has completed move to destination point

        // stepByStep is true when the ship is not going through a wormhole
        if (stepByStep) {
            if (x < new_x) {
                for (; x < new_x && x > 0;) {
                    x++;
                    if (x == new_x)
                        flyOver = false;
                    [x, y, angle, isMeetingWormhole] = this.processArtifact(x, y, angle, flyOver);
                    if (isMeetingWormhole) {
                        return;
                    }
                }
            }
            else {
                for (; x > new_x;) {
                    x--;
                    if (x == new_x)
                        flyOver = false;
                    [x, y, angle, isMeetingWormhole] = this.processArtifact(x, y, angle, flyOver);
                    if (isMeetingWormhole) {
                        return;
                    }
                }
            }
            if (y < new_y) {
                for (; y < new_y && y > 0;) {
                    y++;
                    if (y == new_y)
                        flyOver = false;
                    [x, y, angle, isMeetingWormhole] = this.processArtifact(x, y, angle, flyOver);
                    if (isMeetingWormhole) {
                        return;
                    }
                }
            }
            else {
                for (; y > new_y;) {
                    y--;
                    if (y == new_y)
                        flyOver = false;
                    [x, y, angle, isMeetingWormhole] = this.processArtifact(x, y, angle, flyOver);
                    if (isMeetingWormhole) {
                        return;
                    }
                }
            }
        } else {
            this.processArtifact(new_x, new_y, angle, false);
        }


    }

    processArtifact(x, y, angle, flyOver) {

        let artifactResult = "";
        if(!flyOver) { // move into cell
            artifactResult = this.move(x, y, angle);
            if (artifactResult === "wormhole") {
                while (artifactResult === "wormhole") {

                    [x, y] = wormholeBehavior(x, y);
                    document.forms[1].location.value = x.toString() + "," + y.toString();

                    artifactResult = this.move(x, y, angle);

                }
                return [x, y, angle, true];
            }
            else {
                if (artifactResult === "planet" || artifactResult === "asteroid" || artifactResult === "space-station") {
                    gameOver("You got a collision with the " + artifactResult + "!");
                    return [-1, -1, -1, false];
                }
				else {
					if(artifactResult === "recipe") {
						victory("You've recovered the Koca-Kola recipe!");
						return [-1, -1, -1, false];
					}
				}
			}
        }
        else { // fly over cell but still check for asteroids
            let artifact = $id("cell-" + x + "-" + y);
            if (artifact !== null) {
                artifactResult = artifact.getAttribute("type");
            }
            if (artifactResult === "asteroid") {
                this.move(x, y, angle);
                artifact.style.display = "block";
                gameOver("You got a collision with the " + artifactResult + "!");
                return [-1, -1, -1, false];
            }
        }
        return [x, y, angle, false];
    }

    move(x, y, angle) {
        let y_table = this.height - y + 1;
        let artifactResult = "";

        //check whether (x,y) has an artifact
        let artifact = $id("cell-" + x + "-" + y);
        if (artifact !== null) {
            artifact.style.display = "block";
            artifactResult = artifact.getAttribute("type");
        }

        //Show glow start for the passing step.
        let td = $id("td-" + this.ship.x_of_map + "-" + this.ship.y_of_map);
        let check = td.innerHTML.indexOf("img") > 0;
        if (check === false) {
            let img = document.createElement("img");
            img.style.width = (CELL_SIZE - 25) + "px";
            img.style.height = (CELL_SIZE - 25) + "px";
            img.setAttribute("src", "img/glow_start.png");
            img.setAttribute("id", "start-" + this.ship.x_of_map + "-" + this.ship.y_of_map);
            td.appendChild(img);
        }

        //move the ship
        this.ship.setLocation(x, y, angle);

        //move the table
        this.elem.style.left = (window.innerWidth / 2 - this.ship.x_of_map * this.boundx) + "px";
        this.elem.style.top = (window.innerHeight / 2 - this.ship.y_of_table * this.boundy) + "px";


        return artifactResult;

    }

    sensorEffect() {

        let x = this.ship.x_of_map;
        let y = this.ship.y_of_map;
        let td = $id("td-" + x + "-" + y);
        td.innerHTML = "";
        td.appendChild(this.sensor);

        clearInterval(this.timer);

        let frame = () => {
            if (this.increase == 5.0) {
                this.delta = -1;
            }

            this.increase += 0.5 * this.delta;

            if (this.increase < 0) {
                clearInterval(this.timer);
                this.increase = 0;
                this.delta = 1;
                this.sensor.style.transform = "scale(1.0, 1.0)";
                td.removeChild(this.sensor);
            }

            this.sensor.style.transform = "scale(" + this.increase + "," + this.increase + ")";
        }

        this.timer = setInterval(frame, 50);

    }
}


var ship;
var renderMap;


