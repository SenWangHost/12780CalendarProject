var eventsArray = [];
var calEventStore = null;
$(document).ready(function() {
    // load the tasks from the database
    loadTasksFromDatabase();
    console.log(eventsArray);
    setTimeout(function() {
        initializeCalendar();
    }, 800);
});

function loadTasksFromDatabase() {
    // make ajax request for fetching the data
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8000/getTasks/", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == 'UNANTHORIZED') {
                alert("You are not logged in, you will be redirected to the log in page!");
                window.location.href = "http://localhost:8000";
                return;
            } else {
                eventsArray = JSON.parse(this.responseText);
                console.log(eventsArray);
                return;
            }
        }
    };
}

function initializeCalendar() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2017-12-12',
        defaultView: 'month',
        editable: true,
        events: eventsArray,
        dayClick: function(date, jsEvent, view) {
            console.log('Clicked on: ' + date.format());
            console.log('Current view: ' + view.name);
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            if (view.name == "month") {
                document.getElementById('startDate').value = date.format();
            } else {
                temp = date.format().split('T');
                document.getElementById('startDate').value = temp[0];
                document.getElementById('startTime').value = temp[1];
            }
            // clearModalForm();
            $('#exampleModal').modal('toggle');

            // change the day's background color just for fun
            // $(this).css('background-color', 'red');
        },
        eventClick: function(calEvent, jsEvent, view) {

            // alert('Event: ' + calEvent.title);
            // alert('Event:' + calEvent.description);
            // console.log(calEvent.title);
            // console.log(calEvent.description);
            // console.log(calEvent.location);
            // console.log(calEvent.allDay);
            // console.log(calEvent.start._i);
            // console.log(calEvent.end._i);
            // alert(calEvent.location);
            // alert(calEvent.color);
            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            // alert('View: ' + view.name);
            calEventStore = calEvent;
            editButtonEffect();
            loadValueFromEvent(calEvent);
            $('#updateDeleteModal').modal('toggle');
            // change the border color just for fun
            // $(this).css('border-color', 'red');

        },
        eventRender: function(event, element) {},
    });
}

function disableTime() {
    // console.log("all day changed!");
    if (document.getElementById('startTime').readOnly) {
        document.getElementById('startTime').readOnly = false;
    } else {
        document.getElementById('startTime').readOnly = true;
    }
    if (document.getElementById('endTime').readOnly) {
        document.getElementById('endTime').readOnly = false;
    } else {
        document.getElementById('endTime').readOnly = true;
    }
}

function validateTimeFormat(input) {
    var re = /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/;
    return re.test(input);
}

function validateInput() {
    // clear error field
    document.getElementById("errorField").innerHTML = "";
    var errorMessageF = "<div class='alert alert-danger alert-dismissible fade show' role='alert'>";
    var errorMessageB = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
    var message = "";
    // get title
    var title = document.getElementById('taskTitle').value;
    var allday = document.getElementById('allDay').checked;
    var startDate = document.getElementById('startDate').value;
    var startTime = document.getElementById('startTime').value;
    var endDate = document.getElementById('endDate').value;
    var endTime = document.getElementById('endTime').value;
    if (title == null || title == '') {
        message = errorMessageF + "Your task title cannot be empty!" + errorMessageB;
        document.getElementById("errorField").innerHTML = message;
        return false;
    }
    if (startDate == null || startDate == '') {
        message = errorMessageF + "Your task's start date cannot be empty!" + errorMessageB;
        document.getElementById("errorField").innerHTML = message;
        return false;
    }
    if (endDate == null || endDate == '') {
        message = errorMessageF + "Your task's end date cannot be empty!" + errorMessageB;
        document.getElementById("errorField").innerHTML = message;
        return false;
    }
    if (!allday) {
        if (startTime == null || startTime == '') {
            message = errorMessageF + "Your start time cannot be empty!" + errorMessageB;
            document.getElementById("errorField").innerHTML = message;
            return false;
        }
        if (endTime == null || endTime == '') {
            message = errorMessageF + "Your end time cannot be empty!" + errorMessageB;
            document.getElementById("errorField").innerHTML = message;
            return false;
        }
        if (!validateTimeFormat(startTime)) {
            message = errorMessageF + "Your start time format is incorrect!" + errorMessageB;
            document.getElementById("errorField").innerHTML = message;
            return false;
        }
        if (!validateTimeFormat(endTime)) {
            message = errorMessageF + "Your end time format is incorrect!" + errorMessageB;
            document.getElementById("errorField").innerHTML = message;
            return false;
        }
    }
    return true;
}


function addTaskToCalendar(title, allDay, startDate, startTime, endDate, endTime, description, location, color) {
    if (startTime != '') {
        startDate += 'T' + startTime;
    }
    if (endTime != '') {
        endDate += 'T' + endTime;
    }
    $('#calendar').fullCalendar('addEventSource', [{
        title: title,
        allDay: allDay,
        start: startDate,
        end: endDate,
        description: description,
        location: location,
        color: color,
        textColor: 'white'
    }]);
}

function clearModalForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('allDay').checked = false;
    document.getElementById('startDate').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('endTime').value = '';
    document.getElementById('description').value = '';
    document.getElementById('location').value = '';
}

// the function to use ajax to add task
function addTask() {
    if (!validateInput()) {
        return;
    }
    // get all inputs from the form
    var title = document.getElementById('taskTitle').value;
    var allday = document.getElementById('allDay').checked;
    var startDate = document.getElementById('startDate').value;
    var startTime = document.getElementById('startTime').value;
    var endDate = document.getElementById('endDate').value;
    var endTime = document.getElementById('endTime').value;
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;
    var color = '';
    if (document.getElementById("color1").checked) {
        color = document.getElementById("color1").value;
    } else if (document.getElementById("color2").checked) {
        color = document.getElementById("color2").value;
    } else if (document.getElementById("color3").checked) {
        color = document.getElementById("color3").value;
    }
    console.log(color);
    // send ajax request
    var xhttp = new XMLHttpRequest();
    var params = {
        title: title,
        allday: allday,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        description: description,
        location: location,
        color: color
    };
    xhttp.open("POST", "http://localhost:8000/addTask/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(params));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == "SAVED") {
                addTaskToCalendar(title, allday, startDate, startTime, endDate, endTime, description, location, color);
                $('#exampleModal').modal('toggle');
                clearModalForm();
                return;
            }
            if (this.responseText == "UNANTHORIZED") {
                alert("You are not logged in, you will be redirected to the log in page!");
                window.location.href = "http://localhost:8000";
                return;
            }
            if (this.responseText == "FAILED") {
                alert("error happened");
                window.location.href = "http://localhost:8000";
                return;
            }
        }
    };
}

// the function add edit button effect
function editButtonEffect() {
    document.getElementById("taskTitleUB").onclick = function() {
        document.getElementById("taskTitleU").readOnly = false;
    };
    document.getElementById("startDateUB").onclick = function() {
        document.getElementById("startDateU").readOnly = false;
    };
    document.getElementById("startTimeUB").onclick = function() {
        document.getElementById("startTimeU").readOnly = false;
    };
    document.getElementById("endDateUB").onclick = function() {
        document.getElementById("endDateU").readOnly = false;
    };
    document.getElementById("endTimeUB").onclick = function() {
        document.getElementById("endTimeU").readOnly = false;
    };
    document.getElementById("descriptionUB").onclick = function() {
        document.getElementById("descriptionU").readOnly = false;
    };
    document.getElementById("locationUB").onclick = function() {
        document.getElementById("locationU").readOnly = false;
    };
}

// the function to get current value from the calendar event
function loadValueFromEvent(calEvent) {
    document.getElementById("taskTitleU").value = calEvent.title;
    document.getElementById("descriptionU").value = calEvent.description;
    document.getElementById("locationU").value = calEvent.location;
    // set the color radio box to be checked
    if (calEvent.color == 'red') {
        document.getElementById("colorU1").checked = true;
    } else if (calEvent.color == 'yellow') {
        document.getElementById("colorU2").checked = true;
    } else if (calEvent.color == 'green') {
        document.getElementById("colorU3").checked = true;
    }
    if (calEvent.start._i.indexOf('T') != -1) {
        var temp = calEvent.start._i.split('T');
        document.getElementById("startDateU").value = temp[0];
        document.getElementById("startTimeU").value = temp[1];
    } else {
        document.getElementById("startDateU").value = calEvent.start._i;
    }
    if (calEvent.allDay) {
        document.getElementById("allDayU").checked = true;
    } else {
        document.getElementById("allDayU").checked = false;
        if (calEvent.end._i.indexOf('T') != -1) {
            var temp2 = calEvent.end._i.split('T');
            document.getElementById("endDateU").value = temp2[0];
            document.getElementById("endTimeU").value = temp2[1];
        } else {
            document.getElementById("endDateU").value = calEvent.end._i;
        }
    }
}

// the function to delete task from database
function deleteTask() {
    var title = document.getElementById("taskTitleU").value;
    var startDate = document.getElementById("startDateU").value;
    var startTime = document.getElementById("startTimeU").value;
    xhttp = new XMLHttpRequest();
    var params = {
        title: title,
        startDate: startDate,
        startTime: startTime
    };
    xhttp.open("POST", "http://localhost:8000/deleteTask/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(params));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == "DELETED") {
                deleteTaskFromCalendar(title, startDate, startTime);
                $("#updateDeleteModal").modal('toggle');
                return;
            }
            if (this.responseText == "UNANTHORIZED") {
                alert("You are not logged in, you will be redirected to the log in page!");
                window.location.href = "http://localhost:8000";
                return;
            }
            if (this.responseText == "FAILED") {
                alert("error happened");
                window.location.href = "http://localhost:8000";
                return;
            }
        }
    };
}

// delete the task from calendar
function deleteTaskFromCalendar(title, startDate, startTime) {
    // var description = document.getElementById("descriptionU").value;
    // var location = document.getElementById("locationU").value;
    // var color = '';
    // if (document.getElementById("colorU1").checked) {
    //     color = document.getElementById("colorU1").value;
    // } else if (document.getElementById("colorU2").checked) {
    //     color = document.getElementById("colorU2").value;
    // } else if (document.getElementById("colorU3").checked) {
    //     color = document.getElementById("colorU3").value;
    // }
    if (startTime != '') {
        startDate += 'T' + startTime;
    }
    $('#calendar').fullCalendar('removeEvents', function(calEvent) {
        if (calEvent.title == title && calEvent.start._i == startDate) {
            return true;
        } else {
            return false;
        }
    });
}

// the function to update the task from the database
function updateTask() {
    var title = document.getElementById("taskTitleU").value;
    var allDay = document.getElementById("allDayU").checked;
    var startDate = document.getElementById("startDateU").value;
    var startTime = document.getElementById("startTimeU").value;
    var endDate = document.getElementById("endDateU").value;
    var endTime = document.getElementById("endTimeU").value;
    var description = document.getElementById("descriptionU").value;
    var location = document.getElementById("locationU").value;
    var color = '';
    if (document.getElementById("colorU1").checked) {
        color = document.getElementById("colorU1").value;
    } else if (document.getElementById("colorU2").checked) {
        color = document.getElementById("colorU2").value;
    } else if (document.getElementById("colorU3").checked) {
        color = document.getElementById("colorU3").value;
    }
    console.log(title);
    console.log(allDay);
    console.log(startDate);
    console.log(startTime);
    console.log(endDate);
    console.log(endTime);
    console.log(description);
    console.log(location);
    console.log(color);
    // send ajax request to database for updating the task content
    xhttp = new XMLHttpRequest();
    var params = {
        title: title,
        allDay: allDay,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        description: description,
        location: location,
        color: color
    };
    xhttp.open("POST", "http://localhost:8000/updateTask/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(params));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText == "UPDATE") {
                updateTaskInCalendar(title, allDay, startDate, endDate, description, location, color);
                enableReadOnly();
                $("#updateDeleteModal").modal('toggle');
                return;
            }
            if (this.responseText == "UNANTHORIZED") {
                alert("You are not logged in, you will be redirected to the log in page!");
                window.location.href = "http://localhost:8000";
                return;
            }
            if (this.responseText == "FAILED") {
                alert("error happened");
                window.location.href = "http://localhost:8000";
                return;
            }
        }
    };
}

// the function to update task for the calendar
function updateTaskInCalendar(title, allDay, start, end, description, location, color) {
    console.log(calEventStore);
    if (calEventStore != null) {
        calEventStore.description = description;
        calEventStore.location = location;
        calEventStore.color = color;
        $('#calendar').fullCalendar('updateEvent', calEventStore);
    }
}

// the function to reverse readonly effect
function enableReadOnly() {
    document.getElementById("taskTitleU").readOnly = true;
    document.getElementById("startDateU").readOnly = true;
    document.getElementById("startTimeU").readOnly = true;
    document.getElementById("endDateU").readOnly = true;
    document.getElementById("endTimeU").readOnly = true;
    document.getElementById("descriptionU").readOnly = true;
    document.getElementById("locationU").readOnly = true;
}