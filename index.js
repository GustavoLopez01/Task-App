
import { saveTask, editTask, getAll  } from './helpers/task.js';
import { TaskModel } from './model/task-model.js'

const taskListHTML = document.getElementById('taskListHTML');
const dialogTask = document.getElementById('dialogTask');
const nameTask = document.getElementById('nameTask');
const createIn = document.getElementById('createIn');
const btnCloseDialog = document.getElementById('btnCloseDialog');
const txtIdTask = document.getElementById('txtId');
const updateTask = document.getElementById('updateTask');
const terminateTask = document.getElementById('terminateTask');
const newTask = document.getElementById('newTask');
const newTaskDialog = document.getElementById('newTaskDialog');
const btnCloseNewTaskDialog = document.getElementById('btnCloseNewTaskDialog');
const btnSaveTask = document.getElementById('saveTask');
const nameNewTask = document.getElementById('nameNewTask');

let TASKLIST = [];

const getAllTasks = () =>{
    return TASKLIST = getAll();
}

const showTasksHTML = () =>{

    const dataTasks = getAllTasks() || [];

    let HTML = "";
    cleanHTML();

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

// console.log(taskListHTML.childNodes);
newTask.addEventListener('click', () =>  {
    newTaskDialog.showModal();
});


btnSaveTask.addEventListener('click', () => {

    const task = new TaskModel(new Date(), nameNewTask.value, new Date(), false);
    if(saveTask(task)){
        showTasksHTML();
        newTaskDialog.close();
        nameNewTask.value = '';
    }

});

taskListHTML.addEventListener('click', (e) =>{

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
});


const cleanHTML = () => {

    while(taskListHTML.firstChild){
        taskListHTML.removeChild(taskListHTML.firstChild);
    }

}

btnCloseDialog.addEventListener('click', () =>{
    dialogTask.close();

});

btnCloseNewTaskDialog.addEventListener('click', () => {
    newTaskDialog.close();
})


updateTask.addEventListener('click', () => {
    const existTask = TASKLIST.find((task) => task.id === txtIdTask.value);
    if(existTask){
        existTask.name = nameTask.value;
        if(editTask(TASKLIST)){
            showTasksHTML();
            dialogTask.close();
        }
    }
});

terminateTask.addEventListener('click', () =>{
    const taskExists = TASKLIST.find(task => task.id === txtIdTask.value);

    if(taskExists){
        taskExists.done = true;
        if(editTask(TASKLIST)){
            showTasksHTML();
            dialogTask.close();
        }
    }

})




showTasksHTML();
