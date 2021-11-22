// load tasks

function loadTasks() {
    $(".task").each(function(){
        var key = "hour-" + $(this).data("hour");
        $(this).find(".event").text(localStorage.getItem(key));
    });
}

// show date

function renderCurrentDay() {
    var currentDay = moment().format("dddd, MMMM Do, YYYY");
    $("#currentDay").text(currentDay).attr("data-day", moment().format("D"));
}

// keep up to date, clear data on new date

function auditCurrentDay() {
    var dayOfMonth = moment().format("D");

    if ($("#currentDay").data("day") != dayOfMonth) {
        $(".event").each(function(){
          $(this).text("");
        });
        localStorage.clear();
        document.location.reload(true);
    }
}

// track and color code past, present, future 

function auditTasks() {
    var currentHour = moment().format("H");
    $(".task").each(function(){
        var dataHour = $(this).data("hour");
        if (currentHour > dataHour) { 
            $(this).removeClass("present");
            $(this).removeClass("future");
            $(this).addClass("past");
        }
        else if (currentHour == dataHour) {
            $(this).removeClass("past");
            $(this).removeClass("future");
            $(this).addClass("present");
        }
        else  {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
}

// on click, create new event

$("#timeblocks").on("click", ".task", function(){
    var event = $(this).children(".event").text().trim();
    var textInput = $("<textarea>").val(event);
    $(this).children(".event").replaceWith(textInput);
    textInput.trigger("focus");
});

// click to save event

$("#timeblocks").on("click", ".saveBtn", function() {
    var event = $(this).siblings(".task").find("textarea").val();
    var taskP = $("<p>").addClass("event").text(event);
    $(this).siblings(".task").find("textarea").replaceWith(taskP);
    saveTask($(this).siblings(".task"));
});

// save using key

function saveTask(task) {
    var key = "hour-" + $(task).data("hour");
    var event = $(task).find(".event").text();
    localStorage.setItem(key, event);
}

renderCurrentDay();
loadTasks();
auditTasks();

setInterval(auditCurrentDay, (1000 * 60));
setInterval(auditTasks, (1000 * 60));