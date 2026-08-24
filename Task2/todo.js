"use strict";
const STORAGE_KEY = "tasks";
const inputBox = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
function loadTasks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return [];
        }
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((item) => typeof item === "object" &&
            item !== null &&
            typeof item.text === "string" &&
            typeof item.checked === "boolean");
    }
    catch {
        return [];
    }
}
let tasks = loadTasks();
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
function createTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.style.cssText =
        "padding: 10px; max-width:95%; display: flex; cursor: pointer;";
    listItem.classList.add("list-item");
    if (task.checked) {
        listItem.classList.add("checked");
    }
    const textNode = document.createTextNode(task.text);
    listItem.appendChild(textNode);
    const divv = document.createElement("div");
    listItem.appendChild(divv);
    divv.classList.add("button-container");
    const updatebtn = document.createElement("button");
    updatebtn.innerHTML = "&#9998;";
    updatebtn.classList.add("update-btn");
    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "\u00D7";
    deletebtn.classList.add("delete-btn");
    divv.appendChild(updatebtn);
    divv.appendChild(deletebtn);
    // Event Listeners for listitem to add, update and delete tasks
    listItem.addEventListener("click", (e) => {
        const target = e.target;
        if (target.tagName === "LI") {
            target.classList.toggle("checked");
            task.checked = target.classList.contains("checked");
            saveTasks();
        }
    });
    updatebtn.addEventListener("click", () => {
        const newTask = prompt("Edit the task:", textNode.nodeValue ?? "");
        if (newTask !== null && newTask.trim() !== "") {
            textNode.nodeValue = newTask;
            task.text = newTask;
            saveTasks();
        }
    });
    deletebtn.addEventListener("click", () => {
        taskList.removeChild(listItem);
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
    });
    return listItem;
}
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        taskList.appendChild(createTaskElement(task));
    });
}
function AddTask() {
    if (inputBox.value.trim() === "") {
        alert("Please Enter a Task");
        return;
    }
    const task = { text: inputBox.value.trim(), checked: false };
    tasks.push(task);
    taskList.appendChild(createTaskElement(task));
    saveTasks();
    inputBox.value = "";
}
function handleKeyPress(event) {
    if (event.key === "Enter") {
        AddTask();
    }
}
// Render persisted tasks on refresh
renderTasks();
