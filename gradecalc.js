// ------------ Find Elements ------------ //
//ID Sections
var entryBoxes = document.getElementById("entryBoxes");
var assignmentsTable = document.getElementById("assignmentsTable");
var overallGrade = document.getElementById("overallGrade");
var tBody = document.getElementById("tBody");
var errorMSG = document.getElementById("errorMSG");
//Text Boxes
var assignmentName = document.getElementById("assignmentName");
var pointsEarned = document.getElementById("pointsEarned");
var pointsPossible = document.getElementById("pointsPossible");
//Buttons
var addAssignment = document.getElementById("addAssignment");
var cancelAdd = document.getElementById("cancelAdd");
var newAssignment = document.getElementById("newAssignment");
var removeAll = document.getElementById("removeAll");
//Button Groups
var addMainButtons = document.getElementById("addMainButtons");
var mainButtons = document.getElementById("mainButtons");


//Assignements Array
var Assignments = [];


// ------------ Functions ------------ //

// Clears Inputs
var clearInputs = function() {
    assignmentName.value = "";
    pointsEarned.value = "";
    pointsPossible.value = "";
    errorMSG.setAttribute("style", "display:none;");
}

// Only Allows Numbers for Specific Inputs
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57)))
        return false;
    return true;
}

// Renders Assignments Table
var renderAssignments = function() {
    //Clears some stuff...
    clearInputs();
    tBody.innerHTML = "<tr><th>Assignment</th><th>Points Earned</th><th>Points Total</th><th>Percent</th><th>Remove/Edit</th></tr>"
        //Setup for Overall Grade
    var overallEarned = 0;
    var overallPossible = 0;
    //RENDER ASSIGNMENTS
    for (var i = 0; i < Assignments.length; i++) {
        //Add it to the assignments page
        var trTag = document.createElement("tr");
        //Gets percent for Assignment
        var assignmentPercent = (Assignments[i].earned / Assignments[i].possible) * 100;
        //Rounds
        var roundedPercent = assignmentPercent.toFixed(2);
        trTag.innerHTML = "<td>" + Assignments[i].name + "</td>" + "<td>" + Assignments[i].earned + "</td>" + "<td>" + Assignments[i].possible + "</td><td>" + roundedPercent + "%</td><td><button id='removeButton" + [i] +
            "'>X</button><button id='editButton" + [i] + "'>Edit</button></td>";
        tBody.appendChild(trTag);
        trTag.setAttribute("class", "tableTR");
        trTag.setAttribute("id", "num" + [i]);
        //Adds values onto variable
        overallEarned += +Assignments[i].earned;
        overallPossible += +Assignments[i].possible;
        //Setup for Remove Single
        var removeSingleButton = document.getElementById("removeButton" + i);
        removeSingleButton.addEventListener("click", removeSingle);
        //Setup for Edit
        var editSingleButton = document.getElementById("editButton" + i);
        editSingleButton.addEventListener("click", editSingle);
    }
    //Gets Percent for Overall
    var overallGradePercent = (overallEarned / overallPossible) * 100;
    //Rounds
    var overallRoundedPercent = overallGradePercent.toFixed(0);
    if (isNaN(overallRoundedPercent)) {
        overallRoundedPercent = 0;
    }
    overallGrade.innerHTML = "Overall Grade: " + overallRoundedPercent + "%";
}

var newAssignmentFunction = function(event) {
    //Hide Assignments List and Show Add Assignment
    entryBoxes.setAttribute("style", "display:block;");
    assignmentsTable.setAttribute("style", "display:none;");
    overallGrade.setAttribute("style", "display:none;");
    mainButtons.setAttribute("style", "display:none;");
    document.addEventListener("keydown", enterPress);
}

var addAssignmentFunction = function(event) {
    //If everything is filled out...
    if (assignmentName.value.length >= 1 && pointsEarned.value.length >= 1 && pointsPossible.value.length >= 1 && pointsPossible.value != 0) {
        //Add Assignment to Array
        Assignments.push({
            name: assignmentName.value,
            earned: pointsEarned.value,
            possible: pointsPossible.value
        });
        //Show Assignments List and Hide Add Assignment
        entryBoxes.setAttribute("style", "display:none;");
        assignmentsTable.setAttribute("style", "display:inline-block;");
        overallGrade.setAttribute("style", "display:block;");
        mainButtons.setAttribute("style", "display:block;");
        document.removeEventListener("keydown", enterPress);
        //Render List
        renderAssignments();
    } else {
        errorMSG.setAttribute("style", "display:block;");
    }
}

cancelAddFunction = function(event) {
    entryBoxes.setAttribute("style", "display:none;");
    assignmentsTable.setAttribute("style", "display:inline-block;");
    overallGrade.setAttribute("style", "display:block;");
    mainButtons.setAttribute("style", "display:block;");
    clearInputs();
}

// Removes all assignments from the list
removeAllFunction = function() {
    Assignments = [];
    renderAssignments();
}

//Removes a Single Item
var removeSingle = function() {
    //Gets Specific Instance
    var buttonId = event.currentTarget.getAttribute("ID");
    var buttonNum = buttonId.slice(-1);

    //Removes Item from Array
    Assignments.splice(buttonNum, 1);
    renderAssignments();
}

//Edits an Assignment
var editSingle = function() {
    //Gets Specific Instance
    var buttonId = event.currentTarget.getAttribute("ID");
    var buttonNum = buttonId.slice(-1);

    //Gets Values and Puts in Boxes
    assignmentName.value = Assignments[buttonNum].name;
    pointsEarned.value = Assignments[buttonNum].earned;
    pointsPossible.value = Assignments[buttonNum].possible;

    //Shows Input Boxes
    newAssignmentFunction();
    Assignments.splice(buttonNum, 1);
}

// Pressing Enter Adds Item to List
var enterPress = function(event) {
    if (event.keyCode == 13) {
        addAssignmentFunction();
    }
}

// ------------ Event Listeners ------------ //
newAssignment.addEventListener("click", newAssignmentFunction);
addAssignment.addEventListener("click", addAssignmentFunction);
cancelAdd.addEventListener("click", cancelAddFunction);
removeAll.addEventListener("click", removeAllFunction);

renderAssignments();
