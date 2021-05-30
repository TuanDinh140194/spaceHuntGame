const CELL_SIZE = 50;

function generateElemFrom(parent, id, value) {

    switch (typeof value) {
        case "object": {
            if (Array.isArray(value)) {
                var index = 0;

                for (var option_name of range) {

                    var label = document.createElement("label");
                    label.setAttribute("for", id + index);
                    label.innerHTML = " " + option_name;

                    var option = document.createElement("input");
                    option.setAttribute("type", "checkbox");
                    option.setAttribute("id", id + index);
                    option.setAttribute("name", id);
                    option.setAttribute("value", option_name);

                    if (value.indexOf(option_name, 0) >= 0) {
                        option.checked = true;
                    }
                    else {
                        option.checked = false;
                    }

                    parent.appendChild(option);
                    parent.appendChild(label);

                    var comma = document.createElement("label");
                    comma.innerHTML = ", ";
                    parent.appendChild(comma);

                    index++;
                }
            }
            else {
                var itemIndex = 0;
                for (var item in value) {
                    generateElemFrom(div2, id + itemIndex, value[item]);
                    var comma = document.createElement("label");
                    comma.innerHTML = ", ";
                    parent.appendChild(comma);

                    itemIndex++;
                }
            }

        } break;

        case "number": {

            var input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("value", value);
            input.setAttribute("id", id);
            input.setAttribute("name", id);

            parent.appendChild(input);


        } break;

        case "string": {
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("value", value);
            input.setAttribute("id", id);
            input.setAttribute("name", id);

            parent.appendChild(input);
        } break;

        case "boolean": {
            var index = 0;
            var span = document.createElement("span");
            parent.appendChild(span);

            var label1 = document.createElement("label");
            label1.setAttribute("for", id + index);
            label1.innerHTML = " Yes"

            var option1 = document.createElement("input");
            option1.setAttribute("type", "radio");
            option1.setAttribute("id", id + index);
            option1.setAttribute("name", id);
            option1.setAttribute("value", true);

            span.appendChild(option1);
            span.appendChild(label1);

            var comma = document.createElement("label");
            comma.innerHTML = ", ";
            span.appendChild(comma);

            index++;
            var label2 = document.createElement("label");
            label2.setAttribute("for", id + index);
            label2.innerHTML = " No"

            var option2 = document.createElement("input");
            option2.setAttribute("type", "radio");
            option2.setAttribute("id", id + index);
            option2.setAttribute("name", id);
            option2.setAttribute("value", false);

            span.appendChild(option2);
            span.appendChild(label2);

            if (value) {
                option1.checked = true;
            }
            else {
                option2.checked = true;
            }

        } break;
    }
}

function updateValue(id, parent_value) {
    var itemIndex = 0;
    for (var field in parent_value) {

        switch (typeof parent_value[field]) {

            case "boolean": {

                var eles = $name(id + itemIndex);
                for (var itemEle of eles) {
                    if (itemEle.checked) {
                        parent_value[field] = (itemEle.value === "true" ? true : false);
                    }
                }

            } break;

            case "string": {
                parent_value[field] = $id(id + itemIndex).value;

            } break;

            case "number": {

                parent_value[field] = Number($id(id + itemIndex).value);

            } break;

            case "object": {
                if (Array.isArray(parent_value[field])) {
                    var eles = $name(id + index);

                    for (var itemEle of eles) {
                        if (itemEle.checked) {

                            var index = parent_value[field].indexOf(itemEle.value, 0);
                            if (index < 0)
                                parent_value[field].push(itemEle.value);

                        } else {

                            var index = parent_value[field].indexOf(itemEle.value, 0);
                            if (index >= 0)
                                parent_value[field].splice(index, 1);
                        }
                    }
                }
                else {
                    updateValue(id + index, parent_value[field]);
                }
            } break;

        }
        itemIndex++;

    }

}

function generateForm(id, className, title, obj, objName, callBackExit, callBackSubmit) {
   
    var formWrapper = document.createElement("div");
    formWrapper.style.zIndex = "1";
    formWrapper.setAttribute("id", id);
    formWrapper.className = className;

    var h2 = document.createElement("h2");
    h2.innerHTML = title;
    formWrapper.appendChild(h2);


    var form = document.createElement("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        var itemIndex = 0;
        for (var item of obj) {

            var item_id = item.id + itemIndex;
            switch (typeof item.value) {
                case "object": {
                    if (Array.isArray(item.value)) {
                        var eles = $name(item_id);

                        for (var itemEle of eles) {
                            if (itemEle.checked) {

                                var index = item.value.indexOf(itemEle.value, 0);
                                if (index < 0)
                                    item.value.push(itemEle.value);

                            } else {

                                var index = item.value.indexOf(itemEle.value, 0);
                                if (index >= 0)
                                    item.value.splice(index, 1);
                            }
                        }
                    }
                    else {
                        updateValue(item_id, item.value);
                    }
                } break;

                case "number": {
                    item.value = Number($id(item_id).value);

                } break;

                case "string": {
                    if (item.range.length === 0) {
                        item.value = $id(item_id).value;
                    } else {
                        var eles = $name(item_id);
                        for (var itemEle of eles) {
                            if (itemEle.checked) {
                                item.value = itemEle.value;
                            }
                        }
                    }
                } break;

                case "boolean": {

                    var eles = $name(item_id);

                    for (var itemEle of eles) {
                        if (itemEle.checked) {
                            item.value = (itemEle.value === "true" ? true : false);

                        }
                    }
                } break;

            }
            itemIndex++;

        }

        localStorage.setItem(objName, JSON.stringify(obj));

      
        if (callBackSubmit !== undefined) {
            callBackSubmit();
        }

    });

    formWrapper.appendChild(form);

    var itemIndex = 0;

    for (var item of obj) {

        let { id, name, value, range, unit } = item;
        var item_id = id + itemIndex;

        var div0 = document.createElement("div");
        div0.style.display = "grid";
        div0.style.gridTemplateColumns = "30% 70%";
        div0.style.padding = "10px";
        form.appendChild(div0);

        var div1 = document.createElement("div");
        div0.appendChild(div1);

        var label = document.createElement("label")
        label.innerHTML = name + " : ";
        div1.appendChild(label);

        switch (typeof value) {

            case "object": {

                if (Array.isArray(value)) {
                    var index = 0;
                    var div2 = document.createElement("div");
                    div0.appendChild(div2);

                    for (var option_name of range) {

                        var label = document.createElement("label");
                        label.setAttribute("for", item_id + index);
                        label.innerHTML = " " + option_name;

                        var option = document.createElement("input");
                        option.setAttribute("type", "checkbox");
                        option.setAttribute("id", item_id + index);
                        option.setAttribute("name", item_id);
                        option.setAttribute("value", option_name);
                        if (value.indexOf(option_name, 0) >= 0) {
                            option.checked = true;
                        }
                        else {
                            option.checked = false;
                        }

                        div2.appendChild(option);
                        div2.appendChild(label);

                        var br = document.createElement("br");
                        div2.appendChild(br);

                        index++;
                    }
                }
                else {
                    var div2 = document.createElement("div");
                    div0.appendChild(div2);
                    var index = 0
                    for (var item in value) {
                        generateElemFrom(div2, item_id + index, value[item]);

                        var comma = document.createElement("label");
                        comma.innerHTML = "   ";
                        div2.appendChild(comma);
                        index++;
                    }
                }

            } break;

            case "number": {
                var div2 = document.createElement("div");
                div0.appendChild(div2);

                var input = document.createElement("input");
                input.setAttribute("type", "number");
                input.setAttribute("value", value);
                input.setAttribute("id", item_id);
                input.setAttribute("name", item_id);

                div2.appendChild(input);

                if (unit !== undefined) {
                    var label2 = document.createElement("label");
                    div2.appendChild(label2);

                    label2.innerHTML = " " + unit;
                }

            } break;

            case "string": {
                if (range.length === 0) {
                    var div2 = document.createElement("div");
                    div0.appendChild(div2);

                    var input = document.createElement("input");
                    input.setAttribute("type", "text");
                    input.setAttribute("id", item_id);
                    input.setAttribute("name", item_id);

                    div2.appendChild(input);
                } else {
                    var index = 0;
                    var div2 = document.createElement("div");
                    div0.appendChild(div2);

                    for (var option_name of range) {

                        var label = document.createElement("label");
                        label.setAttribute("for", item_id + index);
                        label.innerHTML = " " + option_name;

                        var option = document.createElement("input");
                        option.setAttribute("type", "radio");
                        option.setAttribute("id", item_id + index);
                        option.setAttribute("name", item_id);
                        option.setAttribute("value", option_name);
                        if (option_name === value) {
                            option.checked = true;
                        }

                        div2.appendChild(option);
                        div2.appendChild(label);

                        var br = document.createElement("br");
                        div2.appendChild(br);

                        index++;
                    }
                }
            } break;

            case "boolean": {
                var div2 = document.createElement("div");
                div0.appendChild(div2);

                var index = 0;
                var label1 = document.createElement("label");
                label1.setAttribute("for", item_id + index);
                label1.innerHTML = " Yes"

                var option1 = document.createElement("input");
                option1.setAttribute("type", "radio");
                option1.setAttribute("id", item_id + index);
                option1.setAttribute("name", item_id);
                option1.setAttribute("value", true);

                div2.appendChild(option1);
                div2.appendChild(label1);

                var br = document.createElement("br");
                div2.appendChild(br);

                index++;
                var label2 = document.createElement("label");
                label2.setAttribute("for", item_id + index);
                label2.innerHTML = " No"

                var option2 = document.createElement("input");
                option2.setAttribute("type", "radio");
                option2.setAttribute("id", item_id + index);
                option2.setAttribute("name", item_id);
                option2.setAttribute("value", false);

                div2.appendChild(option2);
                div2.appendChild(label2);

                if (value) {
                    option1.checked = true;
                }
                else {
                    option2.checked = true;
                }

            } break;
        }

        itemIndex++;
    }

    var div3 = document.createElement("div");
    div3.style.display = "grid";
    div3.style.gridTemplateColumns = "40% 60%";
    div3.style.padding = "10px";

    form.appendChild(div3);

    var div4 = document.createElement("div");
    div4.style.marginLeft = "auto";
    div4.style.marginRight = "auto";

    var div5 = document.createElement("div");
    div5.style.marginLeft = "auto";
    div5.style.marginRight = "auto";

    div3.appendChild(div4);
    div3.appendChild(div5);


    var submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    var cancel = document.createElement("input");
    cancel.setAttribute("type", "button");
    cancel.setAttribute("value", "Cancel");

    cancel.addEventListener("click", () => {
        formWrapper.style.display = "none";
        if (callBackExit !== undefined)
            callBackExit();
    });

    div4.appendChild(submitBtn);
    div5.appendChild(cancel);


    return formWrapper;

}



const wormhole_behavior = {
    goto_random_CP: "Go to random CP",
    goto_fixed_CP: "Go to fixed CP",
}

var configuration = [
    { id: "MAX(X,Y)", name: "Initial MAX(X,Y)", value: { x: 50, y: 50 } },

    { id: "energy", name: "Initial Energy", value: 1000, unit: "J" },

    { id: "credit", name: "Initial Credits", value: 5000, unit: "$" },

    {
        id: "wormhole_behavior", name: " Wormhole behavior", value: wormhole_behavior.goto_random_CP,
        range: [wormhole_behavior.goto_fixed_CP,
        wormhole_behavior.goto_random_CP
        ]
    },
    { id: "specific_cp", name: "Specific CP (X,Y)", value: { x: 50, y: 50 } },

    { id: "die", name: "Never die", value: false },
  
    { id: "supplies", name: "Initial Supplies", value: 100, unit: "%" },


];


if (localStorage.getItem("configuration") !== null) {
    var configuration_temp = JSON.parse(localStorage.getItem("configuration"));
    if (configuration.length === configuration_temp.length) {
        configuration = configuration_temp;
    }
}


function exitConfiguration() {
   
    document.getElementById("mapSizeX").value = configuration[0].value.x;
    document.getElementById("mapSizeY").value = configuration[0].value.y;
    document.getElementById("energy").value = configuration[1].value;
    document.getElementById("supplies").value = configuration[6].value;
    document.getElementById("credits").value = configuration[2].value;
    formConfig.style.display = "none";
}

function whenSubmit() {
    document.getElementById("mapSizeX").value = configuration[0].value.x;
    document.getElementById("mapSizeY").value = configuration[0].value.y;
    document.getElementById("energy").value = configuration[1].value;
    document.getElementById("supplies").value = configuration[6].value;
    document.getElementById("credits").value = configuration[2].value;
  //  renderMap.render();
}

var formConfig = generateForm("form-configure", "game-form", "Configuration Form", configuration, "configuration", whenSubmit, exitConfiguration);

formConfig.style.width = "400px";
formConfig.style.margin = "auto auto auto auto";
formConfig.style.border = "1px solid black";
formConfig.style.display = "none";

document.body.appendChild(formConfig);


