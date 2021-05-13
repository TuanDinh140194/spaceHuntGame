//Tri Le

document.getElementById("configuration").addEventListener("click", function () {
    if ( $id("map") !== null)
         $id("map").style.display = "none";
    formConfig.style.display ="block";
});



document.getElementById("play-game").addEventListener("click", function () {
     
    var main = document.getElementById("main-menu");
    main.style.display = "none";
	
	if(formConfig.style.display === "block") {
	  whenSubmit();
	  formConfig.style.display = "none";
	}

    ship = new Ship(configuration);
    renderMap = new Map("game-map","game-map",configuration[0].value.x, configuration[0].value.y, configuration, ship,celestial);
    renderMap.render();
    $id("control").style.display ="block";
    $id("status").style.display ="block";

    $id("control").appendChild(sensorsButton);
    sensorsButton.style.display = "block";

    let [x,y] = addPlanet("PlanetCeleron");
    celestial[y][x] = 5;
    [x,y] = addPlanet("PlanetXeon");
    celestial[y][x] = 6;
    [x,y] = addPlanet("PlanetRyzen");
    celestial[y][x] = 7;

});


function addPlanet(name) {
    let x = getRandomInt(configuration[0].value.x)
    let y = getRandomInt(configuration[0].value.y)
    let cell = $id("td-" + x + "-" + y);
    let check = (cell.innerHTML.indexOf("img") > 0);
    while (check) {
        x = getRandomInt(configuration[0].value.x);
        y = getRandomInt(configuration[0].value.y);
        cell = $id("td-" + x + "-" + y); 
        check = (cell.innerHTML.indexOf("img") > 0);
    }

    let img = document.createElement("img");
    img.style.width = (CELL_SIZE - 15) + "px";
    img.style.height = (CELL_SIZE - 15) + "px";
    img.setAttribute("src", "img/"+name+".png");
    img.setAttribute("type", name);
    img.setAttribute("id", "planet-" + x + "-" + y);

    let div = document.createElement("div");
    let p = document.createElement("p");
    div.appendChild(p);
    div.style.position = "absolute";
    div.style.paddingTop = "12px";
    p.innerHTML = name;
    cell.appendChild(div);
    cell.appendChild(img);
    return [x,y];
}

sensorsButton.addEventListener('mousedown',function(){
    renderMap.sensorEffect();

});

sensorsButton.style.display = "none";

function alert(message) {
   
	if ($id("alert") !== null ) {
        console.log(message)
		let m = $id("alert");
		m.innerHTML = "<p>"+ message + "<br>"  + "</p>";
		m.style.display = "block";
		setTimeout(function() {
			m.style.display = "none";
		  }, (message.length*100));

	}
};


function gameOver(message){
	if ($id("game-over") !== null ) {
		let m = $id("game-over");
		m.innerHTML = "<p>"+message + "<br>" +"Game over!" + "</p>";
		m.style.display = "block";
		setTimeout(function() {
			m.style.display = "none";
		  }, (message.length*200));

		setTimeout("location.reload(true);", (message.length*200));
		$id("move-up").style.display ="none";
		$id("move-down").style.display ="none";
		$id("move-left").style.display ="none";
		$id("move-right").style.display ="none";
	}
}