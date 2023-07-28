

// let tasks = JSON.parse(localStorage.getItem('task-box'));

// let $textInput, $taskBox, $btnSubmit, $btnClear;
// $btnSubmit = $('#btn-submit')
// $textInput = $('#text-input');
// $taskBox = $('.task-box');
// $btnClear = $('#clear-btn');

// const showTask = () => {

//     let li = '';
//     if (tasks) {
//         tasks.forEach((task, id) => {

//             li += `<li class="task"">
//                         <div class="task-info" onclick="updateStatus(this)">
//                             <span class="task-number">${id + 1}</span>
//                             <span class="text">${task}</span>
//                         </div>
//                         <div class="buttons">
//                              <button class="delete-btn" onclick="deleteItem(${id})"><i class="fa-solid fa-trash"></i></button>
//                              <button class="edit-btn"   onclick="editItem(${id},${task})"><i class="fa-solid fa-pen"></i></button>
//                         </div>
//                         </li>`;
//         })

//     }
//     return $taskBox.html(li);

// }

// showTask();



// const createListItem = () => {
//     let userTask = $textInput.val();
//     if (userTask) {
//         if (!tasks) {
//             tasks = []
//         }
//         $textInput.val('');

//         tasks.push(userTask);
//         localStorage.setItem('task-box', JSON.stringify(tasks));
//     }
//     showTask();
// }

// const updateStatus = (selectedElemet) => {
//     let task = selectedElemet.parentElement;
//     if (!task.classList.contains('completed')) {
//         task.classList.add('completed');
//     } else {
//         task.classList.remove('completed');
//     }
// }

// const deleteItem = (id) => {
//     tasks.splice(id, 1);
//     localStorage.setItem('task-box', JSON.stringify(tasks));
//     showTask();
// }
// const editItem = (id, text) => {

// }
// $btnSubmit.on('click', () => {
//     createListItem();
// })

// $btnClear.on('click', () => {
//     tasks.splice(0, tasks.length);
//     localStorage.setItem('task-box', JSON.stringify(tasks));
//     showTask();
// })




//Array with Tasks getting from the Local storage

let tasks = JSON.parse(localStorage.getItem('task-box'));

//Variables
let $taskBox, $btnSubmit, $textInput;
$taskBox = $('.task-box');
$btnSubmit = $('#btn-submit');
$textInput = $('#text-input');

function showTasks() {
    let li = ''
    $.each(tasks, function (index, task) {
        li += ` <li class="task">
                    <div class="task-info">
                         <span class="task-number">${task.id}</span>
                         <span class="text">${task.text}</span>
                    </div>
                    <div class="buttons">
                        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    </div>
                 </li>`
    })
    return $taskBox.html(li);
}

showTasks();
function createTaskItem() {
    let userTask = $textInput.val();
    if (userTask) {
        if (!tasks) {
            tasks = []
        }
        $textInput.val('');
        let taskInfo = { id: tasks.length + 1, text: userTask, status: "pending" };
        tasks.push(taskInfo);
        localStorage.setItem("task-box", JSON.stringify(tasks));
    }
    showTasks();
}

$btnSubmit.on('click', function () { createTaskItem() })
