class Map {

    constructor(id, className ,width, height, configuration, ship,celestial) {

        this.width = width;
        this.height = height;

        this.id = id;

        this.configuration = configuration;
        this.celestial = celestial;

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
               
                switch(this.celestial[i][j]){
                    case 1: {
                        //Planet
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE-15) + "px";
                        img.style.height = (CELL_SIZE-15) + "px";
                        img.style.display = "none";
                        img.style.left = "5px";
                        img.style.top = "5px";
                        img.setAttribute("src", "img/planet.png");
                        img.setAttribute("id", "cell-" + ( j +1 ) + "-" + (this.height -i ));
                        cell.appendChild(img);
                    }break;
                    case 2: {
                        //asteroid
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE-15) + "px";
                        img.style.height = (CELL_SIZE-15) + "px";
                        img.style.display = "none";
                        img.style.left = "5px";
                        img.style.top = "5px";
                        img.setAttribute("src", "img/asteroid.png");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height -i));
                        cell.appendChild(img);
                    }break;
                    case 3: {
                        //space-station
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE-15) + "px";
                        img.style.height = (CELL_SIZE-15) + "px";
                        img.style.display = "none";
                        img.style.left = "5px";
                        img.style.top = "5px";
                        img.setAttribute("src", "img/space-station.png");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height - i));
                        cell.appendChild(img);
                    }break;
                    case 4: {
                        //wormholes
                        var img = document.createElement("img");
                        img.style.width = (CELL_SIZE-15) + "px";
                        img.style.height = (CELL_SIZE-15) + "px";
                        img.style.display = "none";
                        img.style.left = "5px";
                        img.style.top = "5px";
                        img.setAttribute("src", "img/wormholes.png");
                        img.setAttribute("id", "cell-" + (j + 1) + "-" + (this.height - i ));
                        cell.appendChild(img);
                    }break;
                }
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
        let cell = $id("cell-" + x + "-"+ (this.height - y +1));
        if (cell !== null) {
            cell.style.display = "block";
        }
        this.ship.setLocation(x, y, angle);
        this.elem.style.left = (window.innerWidth / 2 - x * CELL_SIZE) + "px";
        this.elem.style.top = (window.innerHeight / 2 - y * CELL_SIZE) + "px";
    }
}


var ship ;
var renderMap ;


