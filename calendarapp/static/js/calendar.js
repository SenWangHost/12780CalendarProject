var eventsArray = [];

$(document).ready(function() {

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
        eventColor: '#00903B',
        dayClick: function(date, jsEvent, view) {
            // alert('Clicked on: ' + date.format());

            // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

            // alert('Current view: ' + view.name);

            $('#exampleModal').modal('toggle');

            // change the day's background color just for fun
            // $(this).css('background-color', 'red');
        },
        eventClick: function(calEvent, jsEvent, view) {

            alert('Event: ' + calEvent.title);
            alert('Event:' + calEvent.description);
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            alert('View: ' + view.name);

            // change the border color just for fun
            $(this).css('border-color', 'red');

        },
        eventRender: function(event, element) {}
    });

});

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


function testAdd() {
    alert('test button clicked!');
    $('#calendar').fullCalendar('addEventSource', [{
        title: 'All Day Event',
        start: '2017-12-23',
        description: 'this is a description'
    }]);
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
    var color = document.getElementById('color').value;
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
                $('#exampleModal').modal('toggle');
            }
        }
    };
}