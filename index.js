
import { saveTask, editTask, getTaskById, getAll  } from "./helpers/task.js";
import { TaskModel } from './model/task-model.js'

const getAllTasks = () =>{
    console.log(getAll());
}


document.getElementById("saveTask").addEventListener('click', () =>{
    const task = new TaskModel(new Date(), "task 1", new Date(), false);

    const flag = saveTask(task);

    if(flag){
        console.log("se guardo");
    }

})

getAllTasks()
