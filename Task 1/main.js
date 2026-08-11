let inputBox = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

function AddTask() {
  if (inputBox.value.trim() === "") {
    alert("Please Enter a Task");
  } 
  else 
    {
    let listItem = document.createElement("li");
    listItem.textContent = inputBox.value;
    taskList.appendChild(listItem);
    listItem.style ="padding: 10px; max-width:95%; display: flex; cursor: pointer;";
      

    let divv = document.createElement("div");
    listItem.appendChild(divv);
    divv.classList.add("button-container");
    listItem.classList.add("list-item");

    let updatebtn = document.createElement("BUTTON");
    updatebtn.innerHTML = "&#9998;";
    // listItem.appendChild(updatebtn);
    updatebtn.classList.add("update-btn");

    let deletebtn = document.createElement("BUTTON");
    deletebtn.innerHTML = "\u00D7";
    // listItem.appendChild(deletebtn);
    deletebtn.classList.add("delete-btn");

    divv.appendChild(updatebtn);
    divv.appendChild(deletebtn);

    // Event Listeners for listitem to add and update tasks
    listItem.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
      }
    });
    updatebtn.addEventListener("click", (e) => {
      let newTask = prompt("Edit the task:", listItem.firstChild.textContent);
      if (newTask !== null && newTask.trim() !== "") {
        listItem.firstChild.textContent = newTask;
      }
    });

    deletebtn.addEventListener("click", (e) => {
      taskList.removeChild(listItem);
    });

    inputBox.value = "";
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    AddTask();
  }
}

