
const saveTask = (task) => {

    let listTasks = [];
    const dataTasks = localStorage.getItem("tasks") || "";

    // Revisa si existe la lista de tareas en el localstorage
    if(dataTasks.length > 0){
        listTasks = JSON.parse(dataTasks);
        listTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(listTasks));
        return true;
    }

    // Si la lista esta vacia solo la crea
        listTasks = [];
        listTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(listTasks));
        return true;        

}

const editTask = () => {

}


const getTaskById = () => {

}


const getAll = () => {

    return JSON.parse(localStorage.getItem("tasks"))

}

export {saveTask, editTask, getTaskById, getAll}