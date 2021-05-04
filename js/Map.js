class Map {

    constructor(width, height, configuration, ship) {

        this.width = width;
        this.height = height;

        this.id = "map-container";
        this.configuration = configuration;

        this.elem = document.createElement('div');
        this.ship = ship;

    }

    changekey = (e) => {

        e = e || window.event;
        var theShip = this.ship;
        let { x_of_map, y_of_map } = theShip.getLocation();


        switch (e.keyCode) {
            case 38:
                {
                    //up
                    this.ship.setAngle(0);
                    y_of_map--;

                } break;
            case 40:
                {
                    //down
                    this.ship.setAngle(180);
                    y_of_map++;
                } break;
            case 37:
                {
                    //left
                    this.ship.setAngle(270);
                    x_of_map--;
                } break;

            case 39:
                {
                    //right
                    this.ship.setAngle(90);
                    x_of_map++;
                } break;
        }

        this.wormhole(x_of_map, y_of_map);
    }



    wormhole(x, y) {
        var getRandomInt = function (max) {
            return 1 + Math.floor(Math.random() * max);
        }

        if (x <= 0 || x > this.width || y <= 0 || y > this.height) {
            if (configuration[3].value === wormhole_behavior.goto_fixed_CP) {
                x = this.width;
                y = this.height;
            } else {
                x = getRandomInt(this.width);
                y = getRandomInt(this.height);
            }

        }

        this.moveSpaceShip(x, y);
    }

    render() {
        this.elem.style.zIndex = "0";
        this.elem.setAttribute("id", this.id);
        this.elem.style.position = "fixed";
        this.elem.style.transition = "all 1s linear 0s";
        document.body.appendChild(this.elem);

        this.elem.appendChild(this.ship.elem);

        this.ship.setLocation(1, 1);

        this.elem.style.left = (window.innerWidth / 2 - this.ship.x_of_map * CELL_SIZE) + "px";
        this.elem.style.top = (window.innerHeight / 2 - this.ship.y_of_map * CELL_SIZE) + "px";

        document.addEventListener('keyup', this.changekey);

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
                // cell.setAttribute("id",(i+1) + "-" + (j+1));
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        this.elem.style.width = table.style.width;
        this.elem.style.height = table.style.height;

    }

    getSize() {
        return { height: this.width, y: this.height };
    }

    moveSpaceShip(x, y) {
        if (this.ship.energy > 0 || this.configuration[4].value === true) {
            this.ship.setLocation(x, y);
            this.elem.style.left = (window.innerWidth / 2 - x * CELL_SIZE) + "px";
            this.elem.style.top = (window.innerHeight / 2 - y * CELL_SIZE) + "px";
        }
		
		//Checks ship energy.
		//If ship is out of energy and "never die" isn't activated, notify player of game over.
		if (this.ship.energy <= 0 && this.configuration[4].value === false) {
			alert("Game Over! Out of energy!");
			setTimeout("location.reload(true);", 500); // Half a second after clearing alert the page will refresh.
		}
    }
}
