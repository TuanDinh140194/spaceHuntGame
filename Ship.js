// Tri Le
class Ship {
    constructor(configuration) {
        this.x_of_map = 1;
        this.y_of_map = 1;
        this.y_of_table = 1;
        this.currentDirection = 1;
        this.angle = 0;
        this.id = "space-ship";
        this.configuration = configuration;
        this.elem = document.createElement('div');
        this.elem.style.width = CELL_SIZE + "px";
        this.elem.style.height = CELL_SIZE + "px";
        this.elem.style.transition = "all 0.3s linear 0s";
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
        this.boundx = 0;
        this.boundy = 0;
    }

    getLocation() {
        return { x_of_map: this.x_of_map, y_of_map: this.y_of_map };
    }


    setLocation(x, y, angle) {
        //check whether the ship enter the orbit of a planet
        let planet = $id("planet-" + this.x_of_map + "-" + this.y_of_map);
        if (planet !== null) {
            $id("move-up").style.display ="none";
            $id("move-down").style.display ="none";
            $id("move-left").style.display ="none";
            $id("move-right").style.display ="none";

            new Promise((resolve) => {
                if (document.forms[1].shipStatus.value !== "Fully Operational") {
                    alert("Damages have been repaired! Ready to launch!");
                    document.forms[1].shipStatus.value = "Fully Operational";
                }
                setTimeout(resolve, 1000);
            }).then(() => {
                new Promise((resolve) => {
                    alert("The ship is full of energy!");
                    document.forms[1].energy.value = configuration[1].value;
                    setTimeout(resolve, 1000);
                }).then(() => {
                    alert("count down!");
                    clearInterval(this.timer);
                    let count = 3;

                    let frame = () => {
                        if (count === 0) {
                            clearInterval(this.timer);
                            alert("launching!");
                            this.setLocationAndRotateCounterClockWise(x, y, angle);
                            return;
                        }
                        if ($id("alert") !== null) {
                            let m = $id("alert");
                            m.innerHTML = "<p>" + count + "<br>" + "</p>";
                            m.style.display = "block";
                        }
                        count--;
                    }
                    this.timer = setInterval(frame, 1000);
                });
            })



        }
        else {
            this.setAngle(angle);
            this.x_of_map = x;
            this.y_of_map = y;
            this.y_of_table = this.configuration[0].value.y - this.y_of_map + 1;

            if (this.boundx === 0) {
                this.elem.style.left = ((this.x_of_map - 1) * CELL_SIZE) + "px";
                this.elem.style.top = ((this.y_of_table - 1) * (CELL_SIZE + 1.111)) + "px";
            } else {
                this.elem.style.left = ((this.x_of_map - 1) * this.boundx) + "px";
                this.elem.style.top = ((this.y_of_table - 1) * this.boundy) + "px";
            }
        }

    }

    //set to a location by rotating around a planet
    setLocationAndRotateClockWise(x, y, angle) {
        this.setAngle(angle);
        let current_x = parseInt(this.elem.style.left.replace("px", ""));
        let current_y = parseInt(this.elem.style.top.replace("px", ""));
        let theboundx = 0;
        let theboundy = 0;
        if (this.boundx === 0) {
            theboundx = CELL_SIZE;
            theboundy = (CELL_SIZE + 1.111);
        } else {
            theboundx = this.boundx;
            theboundy = this.boundy;
        }
        let target_x = (x - 1) * theboundx;
        let target_y = (this.configuration[0].value.y - y) * theboundy;
        let phi;
        if (target_x !== current_x) {
            if (target_x < current_x)
                phi = 0;
            else
                phi = 180;
        } else if (target_y !== current_y) {
            if (target_y < current_y)
                phi = 90;
            else
                phi = 270;
        }


        let center_x = target_x;
        let center_y = target_y;
        let b = phi;
        let a = 0;
        let r = Math.sqrt(Math.pow(target_x - current_x, 2) + Math.pow(target_y - current_y, 2));
        let dr = r / 36;
        a = (b) * Math.PI / 180;
        let dy = r * Math.sin(a);
        let dx = r * Math.cos(a);
        clearInterval(this.timer);

        let frame = () => {
            if (b === 360 + phi) {
                clearInterval(this.timer);
                alert("landed safely !");
                //   console.log("target changes to ",target_x,target_y);
                this.x_of_map = x;
                this.y_of_map = y;
                this.elem.style.left = Math.round(target_x) + "px";
                this.elem.style.top = Math.round(target_y) + "px";
                $id("move-up").style.display ="block";
                $id("move-down").style.display ="block";
                $id("move-left").style.display ="block";
                $id("move-right").style.display ="block";
                return;
            }
            center_x = target_x + dx;
            center_y = target_y + dy;
            // console.log("target changes to ",center_x,center_y);
            this.elem.style.left = Math.round(center_x) + "px";
            this.elem.style.top = Math.round(center_y) + "px";

            b += 10;
            r -= dr;
            a = b * Math.PI / 180;
            dy = r * Math.sin(a);
            dx = r * Math.cos(a);
        }

        this.timer = setInterval(frame, 0.5 * 360);
    }

    setLocationAndRotateCounterClockWise(x, y, angle) {
        this.setAngle(angle);
        let current_x = parseInt(this.elem.style.left.replace("px", ""));
        let current_y = parseInt(this.elem.style.top.replace("px", ""));
        let theboundx = 0;
        let theboundy = 0;
        if (this.boundx === 0) {
            theboundx = CELL_SIZE;
            theboundy = (CELL_SIZE + 1.111);
        } else {
            theboundx = this.boundx;
            theboundy = this.boundy;
        }
        //      console.log("current , ",current_x,current_y);
        let target_x = (x - 1) * theboundx;
        let target_y = (this.configuration[0].value.y - y) * theboundy;
        let phi;
        if (target_x !== current_x) {
            if (target_x < current_x)
                phi = 0;
            else
                phi = 180;
        } else if (target_y !== current_y) {
            if (target_y < current_y)
                phi = 90;
            else
                phi = 270;
        }


        let center_x = current_x;
        let center_y = current_y;
        //    console.log("target ",target_x,target_y);
        let b = 0;
        let a = 0;
        let r = Math.sqrt(Math.pow(target_x - current_x, 2) + Math.pow(target_y - current_y, 2));
        let dr = r / 36;

        a = (b) * Math.PI / 180;
        let dy = r * Math.sin(a);
        let dx = r * Math.cos(a);
        clearInterval(this.timer);

        let frame = () => {
            if ((b === -360) || (b <= -90 && Math.round(center_x) === target_x && Math.round(center_y) === target_y)) {
                clearInterval(this.timer);
                alert("exited the orbit !");
                this.x_of_map = x;
                this.y_of_map = y;
                this.elem.style.left = Math.round(target_x) + "px";
                this.elem.style.top = Math.round(target_y) + "px";
                $id("move-up").style.display ="block";
                $id("move-down").style.display ="block";
                $id("move-left").style.display ="block";
                $id("move-right").style.display ="block";
                return;
            }
            center_x = current_x + dx;
            center_y = current_y + dy;
            this.elem.style.left = Math.round(center_x) + "px";
            this.elem.style.top = Math.round(center_y) + "px";

            b -= 10;
            a = b * Math.PI / 180;
            dy = r * Math.sin(a);
            dx = r * Math.cos(a);
        }


        this.timer = setInterval(frame, 0.5 * 360);
    }

    setAngle(newAngle) {
        switch (newAngle) {
            case 90: {
                newAngle = 0;
            } break;
            case 0: {
                newAngle = 90;
            } break;
            case 270: {
                newAngle = 180;
            } break;
            case 180: {
                newAngle = 270;
            } break;
        }
        this.angle = newAngle;
        this.elem.style.transform = "rotate(" + this.angle + "deg)";
    }

}
