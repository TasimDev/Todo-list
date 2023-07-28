

//Array with Tasks getting from the Local storage

let tasks = JSON.parse(localStorage.getItem('task-box'));


//Variables
let $taskBox, $btnSubmit, $textInput, $task, $clearBtn, $filters;
$taskBox = $('.task-box');
$btnSubmit = $('#btn-submit');
$textInput = $('#text-input');
$clearBtn = $('#clear-btn');
$filters = $('.filters');



//Deleteing Task Item
$taskBox.on('click', '.delete-btn', function () {
    let selectedId = $(this).attr('data-id');
    //removing selected task from array tasks
    tasks.splice(selectedId, 1);
    localStorage.setItem("task-box", JSON.stringify(tasks));
    showTasks();
})

//Editing Task Item
let editId;
let isEditedTask = false;

$taskBox.on('click', '.edit-btn', function () {
    let selectedId = $(this).attr('data-id');
    let selectedTaskText = $(this).attr('data-task');
    editId = selectedId;
    isEditedTask = true;
    $textInput.val(selectedTaskText);
})
//Deleting all elements
$clearBtn.on('click', function () {
    tasks.splice(0, tasks.length);
    localStorage.setItem("task-box", JSON.stringify(tasks));
    showTasks('all');
})

//Change the status
$taskBox.on('click', '.task-info', function () {
    let selectedElement = $(this);
    let selectedElementId = selectedElement.attr('data-id')
    if (!selectedElement.hasClass('completed')) {
        selectedElement.addClass('completed');
        tasks[selectedElementId].status = 'completed';
    } else {
        selectedElement.removeClass('completed');
        tasks[selectedElementId].status = 'pending'
    }
    localStorage.setItem("task-box", JSON.stringify(tasks));
})
//Filter elements 
$filters.on('click', 'span', function () {
    let selectedElement = $(this);
    let selectedElementId = selectedElement.attr('id');
    selectedElement.parent().find('span.active').removeClass('active');
    selectedElement.addClass('active');
    showTasks(selectedElementId);

})
function showTasks(filter) {

    let li = ''
    if (tasks) {
        $.each(tasks, function (index, task) {
            let isCompleted = task.status == 'completed' ? 'completed' : '';
            if (filter == task.status || filter == 'all') {
                li += ` <li class="task" data-id=${index}>
                    <div class="task-info ${isCompleted}" data-id="${index}">
                         <span class="task-number">${index + 1}</span>
                         <span class="text">${task.text}</span>
                    </div>
                    <div class="buttons">
                        <button class="delete-btn" data-id="${index}"><i class="fa-solid fa-trash"></i></button>
                        <button class="edit-btn" data-id="${index}" data-task="${task.text}"><i class="fa-solid fa-pen"></i></button>
                    </div>
                 </li>`
            }
        })
    }
    $taskBox.html(li);

}

showTasks('all');
function createTaskItem() {
    let userTask = $textInput.val();
    if (userTask) {
        if (!isEditedTask) { // if is Editing Task isn't true
            if (!tasks) {
                tasks = [] //id tasks isn't exist, pass an empty array to tasks
            }
            let taskInfo = { text: userTask, status: 'pending' };
            tasks.push(taskInfo); // adding new task to tasks
        } else {
            isEditedTask = false;
            tasks[editId].text = userTask;
        }

        $textInput.val('');
        localStorage.setItem("task-box", JSON.stringify(tasks));
        showTasks("all");
    }
}

//Creating Task Item
$btnSubmit.on('click', function () { createTaskItem() })