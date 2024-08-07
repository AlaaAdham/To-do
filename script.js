// Empty Array To Store The Tasks
let tasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

// Call loadTasks when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadTasks(tasks));

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('des').value;
    const date = document.getElementById('date').value;
    const rank = document.getElementById('rank').value;
    if (title == "" || description == "" || date == "" || rank == "") {
        alert("Please fill in all fields before adding a task.");
    }
    else {

        let task = {
            title: title,
            description: description,
            date: date,
            rank: rank,
            isDone: false
        };

        console.log(task);
        tasks.push(task);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Add the new task to the UI
        loadTasks(task);

        // Optionally, clear the input fields
        document.getElementById('title').value = '';
        document.getElementById('des').value = '';
        document.getElementById('date').value = '';
        document.getElementById('rank').value = '0';
    }
}

function loadTasks(tasks) {
    // Create a new div element for the task
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    tasks.forEach(function (task) {
        // Create a new div element for the task
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // Set the inner HTML of the taskDiv with task details

        taskDiv.innerHTML = `
            <h2 style="font-size: 18px;">${task.date} - ${task.title}</h2>
            <p>${task.description}</p>
            <p>Rank: ${task.rank}</p>
            <div style="margin-left:185px;">
            <button type="button" style="border-radius: 50px;"
                class="btn btn-outline-info " onclick="deleteTask('${task.title}')">Delete</button>  
            <button type="button" style="border-radius: 50px;"
                class="btn btn-outline-info"  onclick="markDone('${task.title}')">Done</button>  
            </div>
        `;

        // Append the taskDiv to the task container
        const listTask = document.querySelector('.container3');
        listTask.appendChild(taskDiv);
    });

}


function deleteTask(title) {
    tasks = tasks.filter(task => task.title !== title);
    localStorage.clear();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function markDone(title) {
    tasks.forEach(function (task) {
        if (task.title == title) {
            console.log(task);
            task.isDone = true;
        }
    })
    localStorage.clear();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function searchTask() {
    const date = document.getElementById("date2").value;
    const state = document.getElementById('status').value;

}
