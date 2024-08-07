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
        document.getElementById('taskbutton').value='';

    }
   
}

function loadTasks(tasks) {
    // Create a new div element for the task
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    tasks.forEach(function (task) {
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.id=`${task.title}`
        const buttonsDisplay = task.isDone ? 'none' : 'block';
        taskDiv.innerHTML = `
            <h2 style="font-size: 18px;">${task.date} - ${task.title}</h2>
            <p>${task.description}</p>
            <p>Rank: ${task.rank}</p>
            <div style="margin-left:185px; style="" " id="buttons">
            <button type="button" style="border-radius: 50px;"
                class="btn btn-outline-info "  id="button2+${task.title}" onclick="deleteTask('${task.title}')">Delete</button>  
            <button type="button" style="border-radius: 50px;"
                class="btn btn-outline-info"
                 id="button+${task.title}" onclick="markDone('${task.title}')">Done</button>  
            </div>
        `;

        const listTask = document.querySelector('.container3');
        listTask.appendChild(taskDiv);
    });

}


function deleteTask(title) {
    tasks = tasks.filter(task => task.title !== title);
    localStorage.clear();
        const divToRemove = document.getElementById(title);
        if (divToRemove) {
            divToRemove.remove(); 
        } else {
            console.log(`Div with id ${title} not found.`);
        }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function markDone(title) {
    tasks.forEach(function (task) {
        if (task.title == title) {
            console.log(task);
            task.isDone = true;
        }
    })
    
    // const taskDiv = document.getElementById(title);
    // if (taskDiv) {
    //     // Find the buttons container using a unique ID
    //     const buttonsContainer = document.getElementById(`buttons`);
    //     if (buttonsContainer) {
    //         buttonsContainer.style.display = 'none'; // Hide the buttons container
    //     } else {
    //         console.log(`Buttons container with id "buttons-${title}" not found.`);
    //     }
    // } else {
    //     console.log(`Task div with id ${title} not found.`);
    // }
    localStorage.clear();
    location.reload();

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function searchTask() {
    const date = document.getElementById("date2").value;
    const state = document.getElementById("status").value;
    let state2=false;
    if(state=="Completed")state2=true;
    if(state=="Pending")state2=false;
    const result =tasks.filter(task=>((task.isDone==state2)&&(task.date==date)));
    document.getElementById("container3").innerHTML = ""; 
   loadTasks(result)

}

 function transferInputToTextarea() {
            // Get the value from the input field
            const taskInput = document.getElementById('taskbutton').value;
if(taskInput==="") { alert("Please fill in the title before adding a task.");
    return; 
}
const modalElement = document.getElementById('exampleModal');
const modalInstance = new bootstrap.Modal(modalElement);
modalInstance.show();

            // Set the value to the textarea
            const titleTextarea = document.getElementById('title');
            titleTextarea.value = taskInput;

        }