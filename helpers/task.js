
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

const editTask = ( TaskList = [] ) => {
        localStorage.setItem("tasks", JSON.stringify(TaskList))
        return true;
}

const getAll = () => JSON.parse(localStorage.getItem("tasks"));

const getTasksByFilterOption = ( option ) => {
    console.log(option);
    let opc = null;
    if( option === 'true') opc = true;
    if( option === 'false') opc = false;

    const data = JSON.parse(localStorage.getItem("tasks")) || [];
    return data.filter( task => task.done !== opc);
}

export {saveTask, editTask, getAll, getTasksByFilterOption}