class Ship {
    constructor(configuration) {
        this.x  = window.innerWidth / 2;
        this.y =  window.innerHeight / 2    
        this.x_of_map = 1; 
        this.y_of_map = 1;
        this.energy = 11;
        this.dx = 50;
        this.dy = 50;
        this.angle = 0;
        this.id = "space-ship";
        this.configuration = configuration;
        this.elem =document.createElement('div'); 
        this.elem.setAttribute("id",this.id);
        this.elem.style.position = "absolute";

        this.img = document.createElement('img');
        this.img.setAttribute("src","img/spaceship.gif");
        this.img.style.width = this.dx+"px";
        this.img.style.height = this.dy+"px";

        this.elem.appendChild(this.img);
        

    }

    getLocation() {
        return {x_of_map:this.x_of_map, y_of_map:this.y_of_map};
    }

    setDelta(dx,dy) {
        this.dx =dx;
        this.dy =dy;

        this.img.style.width = this.dx+"px";
        this.img.style.height = this.dy+"px";
    }

    setLocation(x,y) {
        if (this.configuration[4]["value"] === false) 
        this.energy--;
        this.x_of_map = x; 
        this.y_of_map = y;
        this.elem.style.left = (this.x_of_map-1)*this.dx + 2+"px";
        this.elem.style.top = (this.y_of_map-1)*this.dy + 2+ "px";
        
    }
    setAngle(angle) {
        switch(angle) {
            case 0 :
                {
                    //up
                    if (this.angle == 270) {
                        this.angle = 0;
                        this.elem.style.transform = "rotate(90deg)";
                    }
                } break;

            case 180: 
                {
                //down
                } break;
            case 270: 
                {
                    //left 

                } break;
            
        }
       if  (Math.abs(angle - this.angle) == 270 ) {

            if (this.angle <0) 
              this.angle +=90;
            else
              this.angle -=90;
       }
       else 
            this.angle = angle;

        this.elem.style.transform = "rotate("+angle+"deg)";
        this.elem.style.transition="all 1s linear 0s";
          
        

    }
    getAngle() {
        return this.angle;
    }

}