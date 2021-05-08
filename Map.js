class Map {

    constructor(id, className ,width, height, configuration, ship) {

        this.width = width;
        this.height = height;

        this.id = id;

        this.configuration = configuration;

        this.elem = document.createElement('div');
        this.elem.className = className;

        if ( ship != undefined)
            this.ship = ship;

    }

    render() {
       

        this.elem.style.zIndex = "0";
        this.elem.setAttribute("id", this.id);
        
        if (this.ship !== undefined)
            this.elem.style.position = "fixed";
        
            this.elem.style.transition = "all 1s linear 0s";
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

    moveSpaceShip(x, y, angle) {
        this.ship.setLocation(x, y, angle);
        this.elem.style.left = (window.innerWidth / 2 - x * CELL_SIZE) + "px";
        this.elem.style.top = (window.innerHeight / 2 - y * CELL_SIZE) + "px";
    }
}


var ship ;
var renderMap ;


