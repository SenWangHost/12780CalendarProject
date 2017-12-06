var eventsArray = [{
        title: 'All Day Event',
        start: '2017-12-01',
        description: 'this is a description',
        editable: true,
        color: 'red',
        textColor: 'white',
    },
    {
        title: 'Long Event',
        start: '2017-12-07',
        end: '2017-12-10'
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: '2017-12-09T16:00:00'
    },
    {
        id: 999,
        title: 'Repeating Event',
        start: '2017-12-16T16:00:00'
    },
    {
        title: 'Meeting',
        start: '2017-12-12T10:30:00',
        end: '2017-12-12T12:30:00'
    },
    {
        title: 'Lunch',
        start: '2017-12-12T12:00:00'
    },
    {
        title: 'Birthday Party',
        start: '2017-12-13T07:00:00'
    },
    {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2017-12-28'
    }
];

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

function validateInput() {
    var title = document.getElementById('taskTitle').value;
    var allday = document.getElementById('allDay').value;
    var startDate = document.getElementById('startDate').value;
    var startTime = document.getElementById('startTime').value;
    var endDate = document.getElementById('endDate').value;
    var endTime = document.getElementById('endTime').value;
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

}