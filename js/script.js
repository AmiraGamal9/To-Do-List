const inputBox = document.getElementById("input-box")
const addBtn = document.getElementById("addbtn")
const taskList = document.getElementById("task-list")
let notifications = document.querySelector(".notifications") 



function createToast (type,icon,title,text) {
    let toast = document.createElement("div")
    toast.innerHTML=`
     <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="toast-content">
                    <h3 class="title">${title}</h3>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick=(this.parentElement.remove())></i>
            </div>
    `
    notifications.appendChild(toast);

    setTimeout(()=> toast.remove(),5000)
}


function add() {
    let type="add";
    let icon="fa-solid fa-circle-plus";
    let title="ADDING";
    let text="You Add New Task"
    createToast(type,icon,title,text)
}

function complete() {
    let type="complete";
    let icon="fa-solid fa-circle-check";
    let title="COMPLETE";
    let text="You complete the Task :)"
    createToast(type,icon,title,text)
}
function removetask() {
    let type="remove";
    let icon="fa-solid fa-trash-can";
    let title="DELETE";
    let text="You remove the Task"
    createToast(type,icon,title,text)
}

function addTask() {
    if(inputBox.vaule ==="") {
        alert("Please Enter Task");
    }

    else {
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        let crossIcon=document.createElement("span")
        let editIcon=document.createElement("I")
        crossIcon.innerHTML="\u00d7"
        editIcon.classList.add("fa-solid")
        editIcon.classList.add("fa-pencil")
        li.appendChild(crossIcon)
        li.appendChild(editIcon)
        taskList.appendChild(li);

    }
    inputBox.value="";
    add()
    saveTasks()
}

addBtn.addEventListener("click",addTask)

taskList.addEventListener("click" , function (e) {
    if (e.target.tagName==="LI") {
        e.target.classList.toggle("checked");
        complete()
        saveTasks()
    }
    
    else if (e.target.tagName==="SPAN")
    {
        e.target.parentElement.remove()
        removetask()
        saveTasks()
    }
    else if (e.target.tagName==="I") {
        let taskText = e.target.parentElement.innerText
       let clearTaskText = taskText.split("\u00d7")
       inputBox.value = clearTaskText[0]
        e.target.parentElement.remove()
        saveTasks()
    }
})

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML) //save li elements in local storage
}

function showTasks() {
    taskList.innerHTML=localStorage.getItem("tasks") 
}

showTasks();
