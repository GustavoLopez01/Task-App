
import { saveTask, editTask, getTaskById, getAll  } from "./helpers/task.js";
import { TaskModel } from './model/task-model.js'

const taskListHTML = document.getElementById("taskListHTML");
const dialogTask = document.getElementById("dialogTask");
const nameTask = document.getElementById("nameTask");
const createIn = document.getElementById("createIn");
const btnCloseDialog = document.getElementById("btnCloseDialog");
const txtIdTask = document.getElementById("txtId");
const updateTask = document.getElementById("updateTask");

let TASKLIST = [];

const getAllTasks = () =>{
    return TASKLIST = getAll();
}

const showTasksHTML = () =>{

    const dataTasks = getAllTasks() || [];

    let HTML = "";

    dataTasks.map(task => {

         HTML += `<div class="m-4 card w-80 h-44 border grid justify-items-center drop-shadow-md">
                        <div>
                            <div class="" > ${task.name.toUpperCase()}</div>
                            <div class="" >Create In ${task.date.substring(0,10).toUpperCase()}</div>
                            <div class="" >Done: ${(task.done) ? "Yes" : "No"}</div>
                            <button class="mt-4 w-full rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-48 h-8 text-white" id=${task.id}>Edit Task</button>
                        </div>
                  </div>`;
                

    }); 

    taskListHTML.innerHTML = HTML;
}

// console.log(taskListHTML.childNodes);


taskListHTML.addEventListener('click', (e) =>{
    // console.log(e.target.parentNode.id);
    console.log(e);

    if(e.target.id){
        const respTask = TASKLIST.find(task => task.id === e.target.id)
        if(respTask){
            console.log(respTask);
            nameTask.value = respTask.name;
            createIn.value = respTask.date;
            txtIdTask.value = respTask.id;
            dialogTask.showModal();
    
        }
    }
})


btnCloseDialog.addEventListener('click', () =>{
    dialogTask.close();

})


updateTask.addEventListener('click', () => {
    const existTask = TASKLIST.find((task) => task.id === txtIdTask.value);
    console.log("task existe", existTask);
    if(existTask){
        existTask.name = nameTask.value;
        if(editTask(TASKLIST)){
            location.reload();

        }
    }
});

document.getElementById("saveTask").addEventListener('click', () =>{
    const task = new TaskModel(new Date(), "task 1", new Date(), false);

    const flag = saveTask(task);

    if(flag){
        console.log("se guardo");
    }

})


showTasksHTML();
