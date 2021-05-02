






// if (localStorage.getItem("configuration") !== null) {
//     configuration = JSON.parse(localStorage.getItem("configuration"));
// } 

const wormhole_action = {
    goto_zero_point: "Go to zero point",
    goto_max_point: "Go to max point",
}


var configuration = [
    { id: "max_cell4", name: "Test2", value: { x: "Name", y: 10, male: false }, unit: "px" },

    { id: "max_cell3", name: "Test", value: { x: 10, y: 10 }, unit: "px" },
    { id: "max_cell", name: "Max Cell", value: 20, range: [1, 100], unit: "px" },
    { id: "cell_width", name: " Cell Width", value: 80, range: [50, 60, 70, 80] },
    { id: "never_die", name: "Never die", value: false, range: [true, false] },
    { id: "aaaa", name: "Oh die", value: false, range: [true, false] },
    {
        id: "wormhole", name: "When enter a wormhole", value: wormhole_action.goto_max_point,
        range: [
            wormhole_action.goto_max_point,
            wormhole_action.goto_zero_point
        ]
    },

    {
        id: "test", name: "When enter a wormhole", value: [],
        range: [
            "ha hava hav",
            "okd doodk do",
            "okd doodk do1",
            "okd doodk do2",
        ]
    }

];

var ship = new Ship(configuration);
var renderMap = new Map(20,20,ship);
renderMap.render();

var formConfig = generateForm("form-configure","game-form","Configuration Form",configuration,"configuration");
formConfig.style.width = "400px";
document.body.appendChild(formConfig);


var realTimeStatus = [
    { type: 0, name: "X", objectName: ship, path: [2] },
    { type: 0, name: "Y", objectName: ship, path: [3] },
    { type: 0, name: "Never die", objectName: configuration, path: [4,2] },
    { type: 0, name: "Energy", objectName: ship, path: [4] },
];


var statusForm;
function test(){
    if (statusForm !== undefined) {
        statusForm.parentNode.removeChild(statusForm);
    }

    statusForm = generateStatusForm(realTimeStatus, "status-form", "game-form", "Status");
    statusForm.style.width = "200px";
    document.body.appendChild(statusForm);
}

window.setInterval(test, 1000);

