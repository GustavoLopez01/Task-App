
import { saveTask, editTask, getAll  } from './helpers/task.js';
import { TaskModel } from './model/task-model.js'

const taskListHTML = document.querySelector('#taskListHTML');
const dialogTask = document.querySelector('#dialogTask');
const nameTask = document.querySelector('#nameTask');
const createIn = document.querySelector('#createIn');
const btnCloseDialog = document.querySelector('#btnCloseDialog');
const txtIdTask = document.querySelector('#txtId');
const updateTask = document.querySelector('#updateTask');
const terminateTask = document.querySelector('#terminateTask');
const newTask = document.querySelector('#newTask');
const newTaskDialog = document.querySelector('#newTaskDialog');
const btnCloseNewTaskDialog = document.querySelector('#btnCloseNewTaskDialog');
const btnSaveTask = document.querySelector('#saveTask');
const nameNewTask = document.querySelector('#nameNewTask');

let TASKLIST = [];

// Extrae las tareas del localstorage
const getAllTasks = () =>{
    return TASKLIST = getAll();
}

const showTasksHTML = () =>{

    const dataTasks = getAllTasks() || [];
    let HTML = "";

    // Limpiamos el html previo antes de volver a mostrarlo
    cleanHTML();

    // Pintamos las tareas que existen en nuestra BD Localstorage
    dataTasks.forEach(task => {
        
        HTML += `<div class="m-4 card w-80 h-48 border grid justify-items-center drop-shadow-md">
                    <div class="" >Name: ${task.name.toUpperCase()}</div>
                    <div class="" >Create In: ${task.date.substring(0,10).toUpperCase()}</div>
                    <div class="flex items-center">
                    <div class="py-4">Done:</div>
                    <div class="m-1"> ${(task.done) ? "<i class='small material-icons mt-2'> check </i>" : "<i class='small material-icons mt-2'> close </i>" }</div>
                    </div>
                    <button class="mt-4 cursor-pointer w-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-900 hover:from-sky-500 hover:to-cyan-700 w-48 h-8 text-white edit-task" task-id=${task.id}>Edit Task</button>
                 </div>`;

    });

    taskListHTML.innerHTML = HTML;
}


// Se muestra la tarea individual en el modal
const showTask = (e) => {

    if(e.target.classList.contains('edit-task')){
        const taskId = e.target.getAttribute('task-id');
        if(taskId){
            const respTask = TASKLIST.find(task => task.id === taskId)
            if(respTask){
                nameTask.value = respTask.name;
                createIn.value = respTask.date.substring(0,10);
                txtIdTask.value = respTask.id;
                if(respTask.done){
                    terminateTask.classList.add('opacity-50', 'cursor-not-allowed');
                    updateTask.classList.add('opacity-50', 'cursor-not-allowed');
                    nameTask.classList.add('cursor-not-allowed');
                    createIn.classList.add('cursor-not-allowed');
                    nameTask.disabled = true;
                }else{
                    terminateTask.classList.remove('opacity-50', 'cursor-not-allowed');
                    updateTask.classList.remove('opacity-50', 'cursor-not-allowed');
                    nameTask.classList.remove('cursor-not-allowed');
                    createIn.classList.remove('cursor-not-allowed');
                    nameTask.disabled = false;
                }
                dialogTask.showModal();
            }
        }
    }
}

// Se actualiza una tarea
const updateTaskBD = (e) => {
    const existTask = TASKLIST.find((task) => task.id === txtIdTask.value);
    if(existTask){
        existTask.name = nameTask.value;
        if(editTask(TASKLIST)){
            showTasksHTML();
            dialogTask.close();
        }
    }
}

// Se actualiza una tarea por el campo de 'done'
const doneTask = (e) => {
    const taskExists = TASKLIST.find(task => task.id === txtIdTask.value);
    if(taskExists){
        taskExists.done = true;
        if(editTask(TASKLIST)){
            showTasksHTML();
            dialogTask.close();
        }
    }
}

// Se guarda la tarea en el localstorage
const saveTaskBD = (e) => {

    const task = new TaskModel(new Date(), nameNewTask.value, new Date(), false);
    if(saveTask(task)){
        showTasksHTML();
        newTaskDialog.close();
        nameNewTask.value = '';
    }
}

// Limpia el html previo
const cleanHTML = () => {
    while(taskListHTML.firstChild){
        taskListHTML.removeChild(taskListHTML.firstChild);
    }
}

// Muestra el modal para una nueva tarea
newTask.addEventListener('click', () =>  {
    newTaskDialog.showModal();
});

// Cierra el modal de la tarea ya existente
btnCloseDialog.addEventListener('click', () =>{
    dialogTask.close();

});

// Cierra el modal de la nueva tarea
btnCloseNewTaskDialog.addEventListener('click', () => {
    newTaskDialog.close();
});

// Eventos
taskListHTML.addEventListener('click', showTask);
updateTask.addEventListener('click', updateTaskBD);
terminateTask.addEventListener('click', doneTask);
btnSaveTask.addEventListener('click', saveTaskBD);

showTasksHTML();
