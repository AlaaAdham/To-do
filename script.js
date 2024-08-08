class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    addTask() {
        console.log("addTask");
        const title = $("#title").val();
        const description = $("#des").val();
        const date = $("#date").val();
        const rank = $("#rank").val();
        if (description === "") alert("Please fill in the description before adding a task.");
        else if (date === "") alert("Please fill in the date before adding a task.");
        else if (rank === "") alert("Please fill in the rank before adding a task.");
        else {
            let task = {
                title,
                description,
                date,
                rank,
                isDone: false
            };
            this.tasks.push(task);
            this.saveTasks();
            this.loadTasks();

            // Clear input fields
            document.getElementById('title').value = '';
            document.getElementById('des').value = '';
            document.getElementById('date').value = '';
            document.getElementById('rank').value = '0';
            document.getElementById('taskbutton').value = '';
        }
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    markDone(title) {
        console.log("markDone");
        this.tasks.forEach(task => {
            if (task.title === title) {
                task.isDone = true;
            }
        });
        this.saveTasks();
        this.loadTasks(); // Refresh the displayed tasks
    }

    deleteTask(title) {
        console.log("deleteTask");
        this.tasks = this.tasks.filter(task => task.title !== title);
        this.saveTasks();
        this.loadTasks(); // Refresh the displayed tasks
    }

    loadTasks() {
        const listTask = document.querySelector('.container3');
        listTask.innerHTML = ''; // Clear the container before loading tasks
        this.tasks.forEach(task => {
            let taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = `${task.title}`;
            taskDiv.innerHTML = `
                <h2>${task.date} - ${task.title}</h2>
                <p>${task.description}</p>
                <p>Rank: ${task.rank}</p>
                <div class="buttons">
                <button type="button" class="btn btn-outline-info delete-task">Delete</button>  
                <button type="button" class="btn btn-outline-info mark-done-task" style="border-radius: 50px;">Done</button>  
                </div>
            `;
            listTask.appendChild(taskDiv);
        });
        const me = this;
        // Attach event handlers to dynamically added buttons
        $('.delete-task').click(function () {
            const taskTitle = $(this).parent().parent().attr('id');
            me.deleteTask(taskTitle);
        })
        $('.mark-done-task').click(function () {
            const taskTitle = $(this).parent().parent().attr('id');
            me.markDone(taskTitle);
        })
    }

    searchTask() {
        const date =  $("#date2").val();
        let state = $("#status").val();
        const result = this.tasks.filter(task => task.isDone === (state==="Completed") && task.date === date);
        $('#container3').empty();
        document.getElementById("container3").innerHTML = "";
        this.tasks = result; // Temporarily set this.tasks to result for filtered view
        this.loadTasks();
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Restore original tasks after search
    }
}

const taskManager = new TaskManager();

$(document).ready(function () {
    taskManager.loadTasks(); // Load tasks when the instance is created

    $("#add").click(function () {

        taskManager.addTask();
    });
    
    $("#delete").click(function () {
        taskManager.deleteTask($("#title").val());
    });
    
    $("#done").click(function () {
        taskManager.markDone($("#title").val());
    });
    
    $("#search").click(function () {
        taskManager.searchTask(title, date); 
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

