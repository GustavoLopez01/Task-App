
import { saveTask  } from "./helpers/task.js";
import {TaskModel} from './model/task-model.js'


document.getElementById("saveTask").addEventListener('click', () =>{
    const task = new TaskModel(new Date(), "task 1", new Date(), false);

    const flag = saveTask(task);

    if(flag){
        console.log("se guardo");
    }
    console.log("llega");

})