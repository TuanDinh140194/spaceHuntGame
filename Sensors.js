var sensorsButton = document.createElement("button");
sensorsButton.innerHTML = "Deploy Sensors";
document.body.appendChild(sensorsButton);

sensorsButton.addEventListener("click", function () {
    document.forms[1].supplies.value -= Math.round(document.forms[1].supplies.value * 0.02); // decrease supplies by two percent

    let coords = document.forms[1].location.value.split(',');
    let x = Number(coords[0]);
    let y = Number(coords[1]);

    // if (artifactLocation-2 <= x <= artifactLocation+2) ...
    // add to array of discovered artifacts

    alert("Sensors deployed: nothing detected");
});
