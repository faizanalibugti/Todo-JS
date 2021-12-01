const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const warning = document.querySelector(".warning");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", action);

function addTodo(e) {
  // to prevent refresh upon creating a new todo item
  e.preventDefault();

  if (todoInput.value == "") {
      warning.style.visibility = "visible"

  } else {
    warning.style.visibility = "hidden"
  todoList.innerHTML += `<div class="todo">
                            <li class="todo-item">
                                <label>${todoInput.value}</label>
                                <input type="text" class="edit">
                            </li>
                            <button class="edit-btn">
                                <span class="icon fas fa-pencil-alt"></span>
                            </button>
                            <button class="complete-btn">
                                <span class="icon fas fa-check"></span>
                            </button>
                            <button class="trash-btn">
                                <span class="icon fas fa-trash"></span>
                            </button>
                        </div>`;

  // Save todo to localStorage
  saveTodos(todoInput.value);
  // reset input field upon submission of todo item
  todoInput.value = "";
  }
}

function action(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }

  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    var editInput = todo.querySelector("input[type=text]");
    var label = todo.querySelector("label");
    var list = todo.querySelector("li");
    var containsClass = list.classList.contains("editMode");
    removeTodos(todo);
    //If class of the parent is .editmode
    if (containsClass) {
      //switch to .editmode
      //label becomes the inputs value.
      label.innerText = editInput.value;
      saveTodos(label.innerText);
    } else {
      editInput.value = label.innerText;
    }

    //toggle .editmode on the parent.
    list.classList.toggle("editMode");
  }
}

function saveTodos(todo) {
  // First populate todos from localStorage if present
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    todoList.innerHTML += `<div class="todo">
                            <li class="todo-item">
                                <label>${todo}</label>
                                <input type="text" class="edit">
                            </li>
                            <button class="edit-btn">
                                <span class="icon fas fa-pencil-alt"></span>
                            </button>
                            <button class="complete-btn">
                                <span class="icon fas fa-check"></span>
                            </button>
                            <button class="trash-btn">
                                <span class="icon fas fa-trash"></span>
                            </button>
                        </div>`;
  });
}

function removeTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
