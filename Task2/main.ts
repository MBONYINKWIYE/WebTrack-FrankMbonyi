interface Task {
  text: string;
  checked: boolean;
}

const STORAGE_KEY = "tasks";

const inputBox = document.getElementById("taskInput") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item: unknown): item is Task =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Task).text === "string" &&
        typeof (item as Task).checked === "boolean"
    );
  } catch {
    return [];
  }
}

let tasks: Task[] = loadTasks();

function saveTasks(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskElement(task: Task): HTMLLIElement {
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
  listItem.addEventListener("click", (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.tagName === "LI") {
      target.classList.toggle("checked");
      task.checked = target.classList.contains("checked");
      saveTasks();
    }
  });

  updatebtn.addEventListener("click", (): void => {
    const newTask = prompt("Edit the task:", textNode.nodeValue ?? "");
    if (newTask !== null && newTask.trim() !== "") {
      textNode.nodeValue = newTask;
      task.text = newTask;
      saveTasks();
    }
  });

  deletebtn.addEventListener("click", (): void => {
    taskList.removeChild(listItem);
    tasks = tasks.filter((t) => t !== task);
    saveTasks();
  });

  return listItem;
}

function renderTasks(): void {
  taskList.innerHTML = "";
  tasks.forEach((task: Task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

function AddTask(): void {
  if (inputBox.value.trim() === "") {
    alert("Please Enter a Task");
    return;
  }

  const task: Task = { text: inputBox.value.trim(), checked: false };
  tasks.push(task);
  taskList.appendChild(createTaskElement(task));
  saveTasks();

  inputBox.value = "";
}

function handleKeyPress(event: KeyboardEvent): void {
  if (event.key === "Enter") {
    AddTask();
  }
}

// Rendering tasks on refresh
renderTasks();
