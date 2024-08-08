export class TaskManager {
    constructor() {

        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    addTask() {

        const title = $("#title").val();
        const description = $("#des").val();
        const date = $("#date").val();
        const rank = $("#rank").val();
        if (description == "") alert("Please fill in the description before adding a task.");
        else if (date=="") alert("Please fill in the date before adding a task.");
        else if (rank=="") alert("Please fill in the rank before adding a task.");
        else {

            let task = {
               title,
               description,
               date,
               rank,
               isDone: false

            };
            tasks.push(task);

            this.saveTasks()

            loadTasks(task);

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
        tasks.forEach(function (task) {
            if (task.title == title) {

                task.isDone = true;
            }
        })
        this.saveTasks();
    }

    deleteTask(title) {
        tasks = tasks.filter(task => task.title !== title);
        const divToRemove = document.getElementById(title);
        if (divToRemove) {
            divToRemove.remove();
        } else {
            alert(`Div with id ${title} not found.`);
        }

        this.saveTasks();
    }

    loadTasks(tasks) {
        let taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        tasks.forEach(function (task) {
            let taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = `${task.title}`
            taskDiv.innerHTML = `
                <h2>${task.date} - ${task.title}</h2>
                <p>${task.description}</p>
                <p>Rank: ${task.rank}</p>
                <div class="buttons">
                <button type="button"class="btn btn-outline-info " id="delete">Delete</button>  
                <button type="button" style="border-radius: 50px;"
                    class="btn btn-outline-info" id="done" >Done</button>  
                </div>
            `;

            const listTask = document.querySelector('.container3');
            listTask.appendChild(taskDiv);
        });

    }
    searchTask() {
        const date = document.getElementById("date2").value;
        const state = document.getElementById("status").value;
        (state === "Completed")? state=true:state=false;
        const result = tasks.filter(task => ((task.isDone == state) && (task.date == date)));
        document.getElementById("container3").innerHTML = "";
        loadTasks(result)

    }
}

