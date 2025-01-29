document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task));
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = ()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = ()=>{
    const taskInput = document.getElementById("task-input");
    const text = taskInput.value.trim();
    
    if(text){
        tasks.push({text: text, completed: false});
        taskInput.value = "";

        updateTaskList();
        updateStats();
        saveTasks();
    }
    
}

const toggleTaskComplete = (index)=>{
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();


}

const deleteTask = (index) =>{
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();

}

const editTask = (index)=>{
    const taskInput = document.getElementById("task-input");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats(); 
    saveTasks();
}

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;

    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;

    if (totalTasks > 0 && completeTasks === totalTasks) {
        animation();
        
        // Add a small delay before resetting the list
        setTimeout(() => {
            tasks = []; // Clear all tasks
            updateTaskList();
            updateStats(); 
            saveTasks(); // Save empty list to localStorage
        }, 2000); // 2 seconds delay for animation to complete
    }
};



const updateTaskList = ()=> {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItems = document.createElement("li");

        listItems.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskComplete(${index})">
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit.png" onClick="editTask(${index})">
                <img src="bin.png" onClick="deleteTask(${index})">
            </div>
        </div>`;

        taskList.append(listItems);
    });
};


document.getElementById("newtask").addEventListener("click", function(e){
    e.preventDefault();

    addTask();
})

const animation = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}