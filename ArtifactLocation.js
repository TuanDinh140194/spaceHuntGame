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
    let Wormholes = 4
    let Planets = 1
    let Asteroids = 2
    let SpaceStations = 3
    let arrayObj = [0,1,2,3,4,5]
    let numberWormHoles = SIZE 
    let numberPlanets = SIZE * 2
    let numberAsteroids = SIZE
    let numberSpaceStations = SIZE * 2
    var arr = []
    for (let i = 0; i < SIZE; i++) {

        arr[i] = []
        for (let j = 0; j < SIZE; j++) {
            let choosen = Math.floor(Math.random() * SIZE)

            if(choosen > 4){
                arrayObj[choosen] = 0
            }
            
            if (choosen == Wormholes){
                numberWormHoles--
                if (numberWormHoles <= 0){
                    arrayObj[Wormholes] = 0
                }    
            }
            else if (choosen == Planets){
                numberPlanets--   
                if (numberPlanets <= 0){
                    arrayObj[Planets] = 0
                }
            }          
            else if (choosen == Asteroids){
                numberAsteroids--   
                if (numberAsteroids <= 0){
                    arrayObj[Asteroids] = 0
                }
            }         
            else if (choosen == SpaceStations){
                numberSpaceStations--
                if (numberSpaceStations <= 0){
                    arrayObj[SpaceStations] = 0
                }
            }
            arr[i][j] = arrayObj[choosen]
            /*if (numberWormHoles <= 0)
                arrayObj[Wormholes] = 0
            if (numberPlanets <= 0)
                arrayObj[Planets] = 0      
            if (numberAsteroids <= 0)
                arrayObj[Asteroids] = 0         
            if (numberSpaceStations <= 0)
                arrayObj[SpaceStations] = 0*/
        }
    }
    
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
    SIZE1 = document.getElementById("mapSizeX").value
    SIZE2 = document.getElementById("mapSizeY").value
    //mapArr = arrayArt()
    //celestial = arrayArt()
    let myTable1 = `<table id='map'>` + '\n'
    for (let i=0; i < SIZE1; i++) {
        myTable1 += "<tr>" + '\n';
        for(let j=0; j< SIZE2; j++) {
            let cellColor = "white"
            if (celestial[i][j] == 1) {
                cellColor = "green"
            }
            else if (celestial[i][j] == 2) {
                cellColor = "blue"
            }
            else if (celestial[i][j] == 3) {
                cellColor = "pink"
            }
            else if (celestial[i][j] == 4) {
                cellColor = "black"
            }
            else{
                cellColor = "white"
            }
            myTable1 += '<td class="cell" id=' + i + '-' + j+ '"' + ' value=' + '"'+ celestial[i][j]  + '"' + ' style="background-color:' + cellColor + '"'+   ' >'
            myTable1 += celestial[i][j]
            myTable1 += '</td>' + '\n'
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