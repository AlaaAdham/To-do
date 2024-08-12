
class TaskManager {

    constructor() {
        this.init()
    }

    init() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    addTask(task) {
        try {
            this.validateTask(task);

            this.tasks.push(task);

            this.saveTasks();
        } catch (e) {
            alert(e.message)
        }
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    markDone(title) {
        this.tasks.forEach(task => {
            if (task.title === title) {
                task.isDone = true;
            }
        });
        this.saveTasks();
        this.loadTasks(this.tasks); // Refresh the displayed tasks
    }

    deleteTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
        this.saveTasks();
        this.loadTasks(this.tasks); // Refresh the displayed tasks
    }

    loadTasks(tasks) {
        cleardiv();
        const listTask = document.getElementById("container3");
        tasks.forEach(task => {
            let taskDiv = creatediv(task);
            listTask.appendChild(taskDiv);
          
        });
        buttonaction(this);
        
    }

    searchTask(state, date) {
        const result = this.tasks.filter(task => task.isDone === (state === "Completed") && task.date === date);
        return result;
    }

    validateTask(task) {
        if (task.description === "") {
            throw new Error("desc is required.");
        }
        if (task.date === "") {
            throw new Error("date is required.");
        }
        if (task.rank === "") {
            throw new Error("rank is required.");
        }
    }
}

const taskManager = new TaskManager();

$(document).ready(function () {
    taskManager.loadTasks(taskManager.tasks); // Load tasks when the instance is created

    $("#add").click(function () {
        const title = $("#title").val();
        const description = $("#des").val();
        const date = $("#date").val();
        const rank = $("#rank").val();
        let task = {
            title,
            description,
            date,
            rank,
            isDone: false
        };

        taskManager.addTask(task);
        taskManager.loadTasks(taskManager.tasks);
    });

    $("#search").click(function () {
        const date = $("#date2").val();
        const state = $("#status").val();
        const res = taskManager.searchTask(state, date);
        $('#container3').empty();
        document.getElementById("container3").innerHTML = "";
        taskManager.loadTasks(res);
    });

});

function transferInputToTextarea() {
    const taskInput = document.getElementById('taskbutton').value;
    if (taskInput === "") {
        alert("Please fill in the title before adding a task.");
        return;
    }
    const modalElement = document.getElementById('exampleModal');
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();

    const titleTextarea = document.getElementById('title');
    titleTextarea.value = taskInput;
}

function clearFlds() {
    // Clear input fields
    $("#title").val('');
    $("#des").val('');
    $("#date").val('');
    $("#rank").val(0);
}
function cleardiv()
{
    const listTask = document.getElementById("container3");
    listTask.innerHTML = ''; 
}
function creatediv(task){
   let taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = `${task.title}`;

            
            const doneButton = task.isDone ? '' : `
                <button type="button" class="btn btn-outline-info mark-done-task">Done</button>`;

           
            const taskStyle = task.isDone ? 'text-decoration: line-through;' : '';

            taskDiv.innerHTML = `
                <h2 style="${taskStyle}">${task.date} - ${task.title}</h2>
                <p>${task.description}</p>
                <p>Rank: ${task.rank}</p>
                <div class="buttons">
                    <button type="button" class="btn btn-outline-info delete-task">Delete</button>  
                    ${doneButton} 
                </div>
            `;
            return taskDiv;
}
function buttonaction(me){
        $('.delete-task').click(function () {
            const taskTitle = $(this).parent().parent().attr('id');
            me.deleteTask(taskTitle);
        });

        $('.mark-done-task').click(function () {
            const taskTitle = $(this).parent().parent().attr('id');
            me.markDone(taskTitle);
        });
}