var allbutton = document.getElementsByTagName("button");
var sensor ;
for(let elem of allbutton) {
   // console.log(elem);
    if ( elem.innerHTML ==='Deploy Sensors') {
       sensor = elem;
       break;
    }
}
sensor.style.display = "none";

document.getElementById("configuration").addEventListener("click", function () {
    formConfig.style.display ="block";
});



document.getElementById("play-game").addEventListener("click", function () {
    var main = document.getElementById("main-menu");
    main.style.display = "none";

    ship = new Ship(configuration);
    renderMap = new Map("game-map","game-map",configuration[0].value.x, configuration[0].value.y, configuration, ship);
    renderMap.render();
    renderMap.moveSpaceShip(1,configuration[0].value.y,90);
    $id("control").style.display ="block";
    $id("status").style.display ="block";

    $id("control").appendChild(sensor);
    sensor.style.display= "block";


});
