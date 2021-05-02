
// if (localStorage.getItem("configuration") !== null) {
//     configuration = JSON.parse(localStorage.getItem("configuration"));
// } 

const wormhole_behavior = {
    goto_random_CP: "Go to random CP",
    goto_fixed_CP: "Go to fixed CP",
}


var configuration = [
    { id: "MAX(X,Y)", name: "Initial MAX(X,Y)", value: { x: 50, y: 50}},

    { id: "energy", name: "Initial Energy", value : 1000, unit: "J" },

    { id: "credit", name: "Initial Credits", value: 5000, unit:"$" },

    { id: "wormhole_behavior", name: " Wormhole behavior", value:wormhole_behavior.goto_random_CP, 
                                        range: [    wormhole_behavior.goto_fixed_CP,
                                                    wormhole_behavior.goto_random_CP
                                                ]},

    { id: "die", name: "Never die", value: false},

    { id: "supplies", name: "Initial Supplies", value: 200, unit:"items" },

];

document.getElementById("configuration").addEventListener("click",function(){
    var formConfig = generateForm("form-configure","game-form","Configuration Form",configuration,"configuration");
    formConfig.style.width = "400px";
    document.body.appendChild(formConfig);
}); 


document.getElementById("play-game").addEventListener("click",function(){
    var main =   document.getElementById("main-menu");
    main.style.display = "none";

    var ship = new Ship(configuration);
    var renderMap = new Map(configuration[0].value.x,configuration[0].value.y,configuration,ship);
    renderMap.render();
    
    
    
    var realTimeStatus = [
        { type: 0, name: "X", objectName: ship, path: [2] },
        { type: 0, name: "Y", objectName: ship, path: [3] },
        { type: 0, name: "Never die", objectName: configuration, path: [4,2] },
        { type: 0, name: "Energy", objectName: ship, path: [4] },
    
    ];
    
    
    var statusForm;
    function tick(){
        if (statusForm !== undefined) {
            statusForm.parentNode.removeChild(statusForm);
        }
    
        statusForm = generateStatusForm(realTimeStatus, "status-form", "game-form", "Status");
        statusForm.style.width = "200px";
        document.body.appendChild(statusForm);
    }
    
    window.setInterval(tick, 1000);

});






