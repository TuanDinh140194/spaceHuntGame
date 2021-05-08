

var allbutton = document.getElementsByTagName("button");
var sensor ;
for(let elem of allbutton) {
   // console.log(elem);
    if ( elem.innerHTML ==='Deploy Sensors') {
       sensor = elem;
       break;
    }
}

var chooseMap ;
for(let elem of allbutton) {
   // console.log(elem);
    if ( elem.innerHTML ==='Map') {
        chooseMap = elem;
       break;
    }
}
sensor.style.display = "none";
chooseMap.style.display = "none";



document.getElementById("configuration").addEventListener("click", function () {
    if ( $id("map") !== null)
         $id("map").style.display = "none";
    formConfig.style.display ="block";
});



document.getElementById("play-game").addEventListener("click", function () {
    SIZE = document.getElementById("mapSizeX").value
    celestial = arrayArt();
      
    var main = document.getElementById("main-menu");
    main.style.display = "none";
    if ( $id("map") === null)
        chooseMap.click();
    ship = new Ship(configuration);
    renderMap = new Map("game-map","game-map",configuration[0].value.x, configuration[0].value.y, configuration, ship,celestial);
    renderMap.render();
    renderMap.moveSpaceShip(1,configuration[0].value.y,90);
    $id("control").style.display ="block";
    $id("status").style.display ="block";

    $id("control").appendChild(sensor);
    sensor.style.display= "block";
    $id("map").style.display = "none";



});


document.getElementById("add-artifact").addEventListener("click", function () {
    chooseMap.click();
});

