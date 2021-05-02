
function generateStatusForm(objStatus,id, className,title)  {

    var formWrapper = document.createElement("div");
    formWrapper.style.zIndex ="2";
    formWrapper.setAttribute("id", id);
    formWrapper.className = className;

    var h2 = document.createElement("h2");
    h2.innerHTML = title;
    formWrapper.appendChild(h2);

    for (var item of objStatus) {
        let { type, name, objectName, path } = item;
        var realObject = objectName;
        switch(type) {

            case 0: {
                var div0 = document.createElement("div");
                div0.style.display = "grid";
                div0.style.gridTemplateColumns = "30% 70%";
                div0.style.padding = "10px";
                formWrapper.appendChild(div0);
        
                var div1 = document.createElement("div");
                div0.appendChild(div1);
        
                var label = document.createElement("label")
                label.innerHTML = name + " : ";
                var obj;
                var index = 0;
                div1.appendChild(label);
                if (Array.isArray(realObject)) {
                   obj =  realObject[path[0]];
                   index = 1;
                } else {
                    obj = realObject;
                }
            
                while (index < path.length) {
                    if ( (typeof obj) === "object") {
                       
                        if (Array.isArray(obj)) {
                            
                            obj = obj[path[index]];
                            index++;
                        } else {
                            var field_index = 0;
                          
                            for(var field in obj) {
                                if (index === path.length) {
                                    break;
                                }
                               
                               if (field_index === path[index]) {
                                
                                   obj = obj[field];
                                   index++;
                                   break;
                               }
                               field_index++;
                            }
                        }
                    } else {
                        break;
                    }
                }

                var div2 = document.createElement("div");
                div0.appendChild(div2);
                var label = document.createElement("label");
                label.innerHTML = "" +  obj ;
                div2.appendChild(label);


            } break;

            case 1: {

            } break;
        }
    }

    
    return formWrapper;
}
