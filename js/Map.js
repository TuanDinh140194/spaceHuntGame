class Map {
    constructor(width, height, ship) {
        this.dx = 70;
        this.dy = 70;

        this.width = width;
        this.height = height;

        this.id = "map-container";

        this.elem = document.createElement('div');
        this.elem.style.zIndex = "0";
        this.elem.setAttribute("id", this.id);
       this.elem.style.position = "fixed";
       this.elem.style.transition = "all 1s linear 0s";
        document.body.appendChild(this.elem);

        this.ship = ship;
        
        this.ship.setDelta(this.dx, this.dy);
        this.elem.appendChild(this.ship.elem);
        this.ship.setLocation(width, height);
        this.elem.style.left = (window.innerWidth / 2 - this.ship.x_of_map * this.dx) + "px";
        this.elem.style.top = (window.innerHeight / 2 - this.ship.y_of_map * this.dy) + "px";

        document.addEventListener('keyup', this.changekey);
        
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
                    if (y_of_map > 1) {
                        y_of_map--;
                    }
                } break;
            case 40:
                {
                    //down
                    this.ship.setAngle(180);
                    if (y_of_map < this.height) {
                        y_of_map++;
                    }
                } break;
            case 37:
                {
                    //left
                    this.ship.setAngle(270);
                    if (x_of_map > 1) {
                        x_of_map--;
                    }
                } break;

            case 39:
                {
                    //right
                    this.ship.setAngle(90);
                    if (x_of_map < this.width) {
                        x_of_map++;
                    }
                } break;
        }

        this.moveSpaceShip(x_of_map, y_of_map);
    }

    render() {


        var table = document.createElement('table');
        table.style.borderCollapse = "collapse";
        table.style.width = this.width * this.dx + "px";
        table.style.height = this.height * this.dy + "px";

        this.elem.appendChild(table);
        this.elem.style.backgroundColor = "black";

        for (var i = this.height; i > 0; i--) {
            var row = document.createElement("tr");
            for (var j = this.width; j > 0; j--) {
                var cell = document.createElement("td");
                cell.style.width = (this.dx - 1) + "px";
                cell.style.height = (this.dy - 1) + "px";
                cell.style.padding = 0;
                cell.style.margin = 0;
                cell.style.border = "1px solid white";
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
        if (this.ship.energy > 0 ) {
            this.ship.setLocation(x, y);
            this.elem.style.left = (window.innerWidth / 2 - x * this.dx) + "px";
            this.elem.style.top = (window.innerHeight / 2 - y * this.dy) + "px";
        }

    }
}