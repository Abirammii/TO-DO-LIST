const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page load
tasks.forEach(task => renderTask(task.text, task.completed));

// Add task on button click
addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText !== "") {
    renderTask(taskText);
    tasks.push({ text: taskText, completed: false });
    updateLocalStorage();
    input.value = "";
  }
});

// Render task
function renderTask(text, completed = false) {
  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button onclick="toggleComplete(this)">✔</button>
      <button onclick="deleteTask(this)">✖</button>
    </div>
  `;

  taskList.appendChild(li);
}

// Toggle complete
function toggleComplete(button) {
  const li = button.parentElement.parentElement;
  li.classList.toggle("completed");

  updateTasksArray();
}

// Delete task
function deleteTask(button) {
  const li = button.parentElement.parentElement;
  li.remove();
  updateTasksArray();
}

// Update localStorage from current list
function updateTasksArray() {
  const listItems = taskList.querySelectorAll(".task-item");
  tasks = Array.from(listItems).map(item => ({
    text: item.querySelector("span").innerText,
    completed: item.classList.contains("completed")
  }));
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
