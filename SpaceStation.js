class SpaceStation {

    get chanceToWin() { return eval(this._chanceToWin); }
    get amountToWin() { return eval(this._amountToWin); }
    get entryFee() { return eval(this._entryFee); }

    set chanceToWin(num) { this._chanceToWin = eval(num); }
    set amountToWin(num) { this._amountToWin = eval(num); }
    set entryFee(num) { this._entryFee = eval(num); }

    constructor(id, img, amountToWin, chanceToWin, entryFee){
        
        this._chanceToWin = eval(chanceToWin);
        this._amountToWin = eval(amountToWin);
        this._entryFee = eval(entryFee);
    }

    hitSpaceStation (artifactResult) {
        if (artifactResult === "space-station") {
            let m = $id("game-over");
            message = "You just hit Space-Station. Let's play the game";
            m.innerHTML = "<p>"+message  + "</p>";
            m.style.display = "block";
            setTimeout(function() {
                m.style.display = "none";
              }, (message.length*200));
            return 1
            //return [-1, -1, -1, false];
        }
        return -1
    }
    interact() {

        if(this._amountToWin <= 0){
            alert("You have docked at " + this.id + "\n" +
                "There happens to be a Casinian playing a game of chance.\n\n" +
                "However, there is nothing to win in the game of chance, so you carry on about your business.");
            return;
        }

        //If the user cannot participate, print a special message.
        if(resources.credits < this._entryFee) {
            alert("You have docked at " + this.id + "\n" +
                "There happens to be a Casinian playing a game of chance.\n\n" +
                "Unfortunately, you are too poor to afford the entry fee.\n" +
                "The Casinian laughs at you.");
            return;
        }

        //If the user can participate, goad them into playing.
        if(confirm("You have docked at " + this.id +"\n" +
            "There happens to be a Casinian playing a game of chance.\n\n" +
            this._chanceToWin + "% chance to win.\n" +
            this._entryFee + " credit entry fee.\n" +
            this._amountToWin + " credits you could win.\n" +
            "The Casinian says you are too chicken to play.\n" +
            "Would you like to prove him wrong?")) {

            resources.subtractCredits(this._entryFee);
            alert("You pay the " + this._entryFee + " credit entry fee.");
            resources.updateUI();

            let roll = Math.floor(Math.random() * Math.floor(100));

            if (roll < this._chanceToWin) { // Won the roll
                resources.addCredits(this._amountToWin + this._entryFee);
                resources.updateUI();
                alert("You won the game of chance and you clean house.\n" +
                    "The Casinian reluctantly gives you your " + this._amountToWin + " credits, refunds your entry fee and mutters something under his breath.\n" +
                    "There is no longer anything to win at this SpaceStation.");
                this._amountToWin = 0;
            } else { //lost the roll
                alert("You lost the game of chance.\n" +
                    "The Casinian laughs as he takes your " + this._entryFee + " credits.");
            }
        } else {
            alert("You have chosen not to participate in the game of chance.\n" +
                "The Casinian yells: \"Bawk bawk bawk! I knew you were chicken!\"");
        }
    }
}


function hitSpaceStation (artifactResult) {
    if (artifactResult === "space-station") {
        let m = $id("game-over");
        message = "Discovered a Space Station! Let's play the game.";
        m.innerHTML = "<p>"+message  + "</p>";
        m.style.display = "block";
        setTimeout(function() {
            let m = $id("game-over");
            m.style.display = "none";
            var a = Math.floor(Math.random() * 10) + 1;
            var b = Math.floor(Math.random() * 10) + 1;
            var op = ["*", "+", "/", "-"][Math.floor(Math.random()*4)];

            
            message = "How much is " + a + " " + op + " " + b + "?";
            m.innerHTML = "<p>"+message  + "</p>";
            m.style.display = "block";

            if (prompt("How much is " + a + " " + op + " " + b + "?") == eval( a + op + b)) {
                let m = $id("game-over");
                message = "Correct! You gain 100 Energy.";
                value = document.forms[1].energy.value;
                new_value = parseInt(value )+ 100;
                document.forms[1].energy.value = new_value;

                m.innerHTML = "<p>"+message  + "</p>";
                m.style.display = "block";
                setTimeout(function() {
                    m.style.display = "none";
                }, (1000));
                return 1;
            } else{
                let m = $id("game-over");
                message = "Incorrect! No rewards given.";
                m.innerHTML = "<p>"+message  + "</p>";
                m.style.display = "block";
                setTimeout(function() {
                    m.style.display = "none";
                }, (1000));
                return 1;
            }
            

          }, (1000));
        
        //return [-1, -1, -1, false];
        return 1
    }
    else 
        return -1
}



function ask() {
    var a = Math.floor(Math.random() * 10) + 1;
    var b = Math.floor(Math.random() * 10) + 1;
    var op = ["*", "+", "/", "-"][Math.floor(Math.random()*4)];
    return prompt("How much is " + a + " " + op + " " + b + "?") == eval( a + op + b);
}

/*
var questions = [ask(), ask(), ask(), ask(), ask()],
    total = questions.length,
    correct = questions.filter(Boolean).length;

alert( "You got "+correct+"/"+total+" correctly");*/