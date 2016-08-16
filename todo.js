var errorMsg = document.getElementById("errorDiv");
var uList = document.getElementById("unList");
var inputBox = document.getElementById("todoInput");
var addButton = document.getElementById("addItem");
var removeAllButton = document.getElementById("removeAll");

var listArray = [];

//Renders List
var renderTodos = function() {
    uList.innerHTML = "";
    errorMsg.setAttribute("style", "display:none;");
    for (var i = 0; i < listArray.length; i++) {
        var liTag = document.createElement("li");
        liTag.innerHTML = listArray[i];
        liTag.setAttribute("id", "itemli" + i);
        var ButtonTag = document.createElement("button");
        ButtonTag.setAttribute("id", "removeSingle" + i);
        ButtonTag.innerHTML = "Remove"
        uList.appendChild(liTag);
        liTag.appendChild(ButtonTag);
        var removeSingleButton = document.getElementById("removeSingle" + i);
        removeSingleButton.addEventListener("click", removeTodo);
    }
}

//Adds an Item
var addTodo = function(event) {
    if (inputBox.value.length >= 1) {
        listArray.push(inputBox.value);
        renderTodos();
        inputBox.value = "";
    } else {
        errorMsg.setAttribute("style", "display:block");
    }
}

//Removes a Single Item
var removeTodo = function(event) {
    //Finds item in Array
    var buttonId = event.currentTarget.getAttribute("ID");
    var buttonNum = buttonId.slice(-1);

    //Removes Item from Array
    listArray.splice(buttonNum, 1);
    renderTodos();
}

//Removes All Items
var removeAll = function(event) {
    listArray.splice(0, listArray.length);
    renderTodos();
}

//Pressing Enter Adds Item to List
var enterPress = function(event) {
    if (event.keyCode == 13) {
        addTodo()
    }
}

//Event Listeners
addButton.addEventListener("click", addTodo);
removeAllButton.addEventListener("click", removeAll);
document.addEventListener("keydown", enterPress);

renderTodos();
