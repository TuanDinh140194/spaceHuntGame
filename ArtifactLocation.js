/*  Array of the location of Celestial Artifact: 1 is a Planets, 2 is a Asteroids, 3 is a SpaceStations, 4 is a Wormholes
    List of the Celestial Artifacts : Planets, Asteroids, Space Stations, Wormholes
    Sensors verify the celestial artifact within 2 CP of the Artifact
    Collision when the space scraft enter the CP have the celestial artifact */

const SIZE = 128
const Wormholes = 4
const Planets = 1
const Asteroids = 2
const SpaceStations = 3
let numberWormHoles = SIZE 
let numberPlanets = SIZE * 2
let numberAsteroids = SIZE
let numberSpaceStations = SIZE * 2
let arrayObj = [0,1,2,3,4,5]

/*Array of Celestial Artifact location*/
function arrayArt (){
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

let celestial = arrayArt()


/*Show Celestial Artifact Location*/
let myTable = '';
for (let i = 0; i < SIZE; i++){
    for(let j = 0; j < SIZE; j++){
        myTable += (celestial[i][j]) + "|"
    }
    myTable += '\n'
}
console.log(myTable)