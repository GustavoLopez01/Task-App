
import { saveTask, editTask, getTaskById, getAll  } from "./helpers/task.js";
import { TaskModel } from './model/task-model.js'

const taskListHTML = document.getElementById("taskListHTML");

const getAllTasks = () =>{
    return getAll();
}

const editTaskById = () => {
    const task = new TaskModel("2023-04-07T18:07:54.739Z","task 1","2023-04-07T18:07:54.739Z",false)
    const response = editTask(task);
    console.log(response);
} 

const showTasksHTML = () =>{

    const dataTasks = getAllTasks() || [];

    let HTML = "";

    dataTasks.map(task => {

         HTML += `<div class="bg-gradient-to-r from-cyan-500 to-blue-500 m-4">
                  <div class="" > ${task.name}</div>
                  <button class="rounded-full bg-cyan-950 w-48 h-8 text-white" id="saveTask">Save Changes</button>
                </div>`;
                

    });

    taskListHTML.innerHTML = HTML;

}


document.getElementById("saveTask").addEventListener('click', () =>{
    const task = new TaskModel(new Date(), "task 1", new Date(), false);

    const flag = saveTask(task);

    if(flag){
        console.log("se guardo");
    }

})

showTasksHTML();

getAllTasks()
editTaskById()
