class Ship {
    constructor(configuration) {
        this.x_of_map = 1;
        this.y_of_map = 1;
        this.currentDirection = 1;
        this.angle = 0;
        this.id = "space-ship";
        this.configuration = configuration;
        this.elem = document.createElement('div');
        this.elem.style.width = CELL_SIZE + "px";
        this.elem.style.height = CELL_SIZE + "px";
        this.elem.style.transition = "all 1s linear 0s";
        this.elem.setAttribute("id", this.id);
        this.elem.style.position = "absolute";
        this.elem.style.zIndex = 1;

        this.img = document.createElement('img');
        this.img.setAttribute("src", "img/spaceship.gif");
        this.img.style.height = (CELL_SIZE - 5) + "px";
        this.img.style.width = (CELL_SIZE - 5) + "px";
        this.img.style.left = "2px";
        this.img.style.top = "2px";
        this.elem.appendChild(this.img);
    }

    getLocation() {
        return { x_of_map: this.x_of_map, y_of_map: this.y_of_map };
    }


    setLocation(x, y, angle) {
        this.setAngle(angle);
        this.x_of_map = x;
        this.y_of_map = y;
        this.elem.style.left = ((this.x_of_map - 1) * CELL_SIZE) + "px";
        this.elem.style.top = ((this.y_of_map - 1) * (CELL_SIZE + 1)) + "px";
       
    }
    
    setAngle(newAngle) {
        switch(newAngle) {
            case 90: {
                newAngle = 0;
            } break;
            case 0: {
                newAngle = 90;
            }break;
            case 270: {
                newAngle = 180;
            }break;
            case 180:{
                newAngle = 270;
            }break;
        }
        this.angle = newAngle;
        this.elem.style.transform = "rotate(" + this.angle + "deg)";
    }

}
