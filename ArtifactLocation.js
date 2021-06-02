/*  Array of the location of Celestial Artifact: 1 is a Planets, 2 is a Asteroids, 3 is a SpaceStations, 4 is a Wormholes
    List of the Celestial Artifacts : Planets, Asteroids, Space Stations, Wormholes
    Sensors verify the celestial artifact within 2 CP of the Artifact
    Collision when the space scraft enter the CP have the celestial artifact */

var SIZE = 128//document.getElementById("mapSizeX").value
/*const Wormholes = 4
const Planets = 1
const Asteroids = 2
const SpaceStations = 3*/



/*Array of Celestial Artifact location*/
function arrayArt (){
    //var SIZE = document.getElementById("mapSizeX").value
    let Planets = 1;
    let Asteroids = 2;
    let SpaceStations = 3;
    let Wormholes = 4;
    let Freighters = 5;
    let arrayObj = [0,1,2,3,4,5];
    let numberWormHoles = SIZE;
    let numberPlanets = SIZE * 2;
    let numberAsteroids = SIZE;
    let numberSpaceStations = SIZE * 2;
    let numberFreighters = SIZE;

    var arr = [];
    
    for (let i = 0; i < SIZE; i++) {

        arr[i] = []
        for (let j = 0; j < SIZE; j++) {
            let choosen = Math.floor(Math.random() * SIZE)

            if(choosen > 5){
                arrayObj[choosen] = 0;
            }
            
            if (choosen == Wormholes){
                numberWormHoles--
                if (numberWormHoles <= 0){
                    arrayObj[Wormholes] = 0;
                }    
            }
            else if (choosen == Planets){
                numberPlanets--   
                if (numberPlanets <= 0){
                    arrayObj[Planets] = 0;
                }
            }          
            else if (choosen == Asteroids){
                numberAsteroids--   
                if (numberAsteroids <= 0){
                    arrayObj[Asteroids] = 0;
                }
            }         
            else if (choosen == SpaceStations){
                numberSpaceStations--
                if (numberSpaceStations <= 0){
                    arrayObj[SpaceStations] = 0;
                }
            }
            else if (choosen == Freighters){
                numberFreighters--;
                if (numberFreighters <= 0){
                    arrayObj[Freighters] = 0;
                }
            }
            arr[i][j] = arrayObj[choosen]
            
        }
    }
    arr[1,0] = SpaceStations;
    return arr    
}

/*Array occurence*/

celestial = arrayArt()


/*Show Celestial Artifact Location*/
myTable = '';
for (let i = 0; i < SIZE; i++){
    for(let j = 0; j < SIZE; j++){
        myTable += (celestial[i][j]) + "|"
    }
    myTable += '\n'
}


var buttonConfig = document.createElement("button");
buttonConfig.innerHTML = "Map";
document.body.appendChild(buttonConfig);


buttonConfig.addEventListener("click", function () {
    SIZE1 = document.getElementById("mapSizeX").value;
    SIZE2 = document.getElementById("mapSizeY").value;
    //mapArr = arrayArt()
    //celestial = arrayArt()
    let myTable1 = `<table id='map'>` + '\n'
    for (let i=0; i < SIZE1; i++) {
        myTable1 += "<tr>" + '\n';
        for(let j=0; j< SIZE2; j++) {
            let cellColor = "black"
            
            myTable1 += '<td class="cell" id=' + i + '-' + j+ '"' + ' value=' + '"'+ celestial[i][j]  + '"' +' style="background-color:' + cellColor + '"'+   ' >'
            
            if(celestial[i][j] == 1){
                myTable1 += "<img width='20' height='20' src='img/planet.png'/>"
            }
            else if (celestial[i][j] == 2) {
                myTable1 += "<img width='20' height='20' src='img/asteroid.png'/>"
            }
            else if (celestial[i][j] == 3) {
                myTable1 += "<img width='20' height='20' src='img/space-station.png'/>"
            }
            else if (celestial[i][j] == 4) {
                myTable1 += "<img width='20' height='20' src='img/wormholes.png'/>"
            }
            else if (celestial[i][j] == 5) {
                myTable1 += "<img width='20' height='20' src='img/freighter.png'/>"
            }
			
            else
                myTable1 += "<img width='20' height='20' src='img/paul-volkmer-qVotvbsuM_c-unsplash1.jpg'/>"
           
        }
        myTable1 += '</td>' + '\n'
    }
    myTable1 += '</table>' + '\n'

    if (document.getElementById("my-map"))
        document.getElementById("my-map").innerHTML = myTable1;
    else {
        var myMap = document.createElement("div");
        myMap.setAttribute("id", "my-map");
        
        myMap.innerHTML = myTable1;
        document.body.appendChild(myMap);
    }



});
