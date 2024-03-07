let todoItemsContainerEle = document.getElementById("todoItemsContainer");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

let todoCount = todoList.length;

let saveBtnEle = document.getElementById("saveBtn");
saveBtnEle.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onTodoStatusChanged(checkboxId, labelId, todoId) {
    // let checkboxEle = document.getElementById(checkboxId);
    // let todoElement = document.getElementById(todoId);
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("checked");
    let todoIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[todoIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    let todoEle = document.getElementById(todoId);
    todoItemsContainerEle.removeChild(todoEle);
    let deleteItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteItemIndex, 1);
}

function appendAndDisplayTodoItems(todo) {
     const {time}= todo;
    // const Year = time.getFullYear();
    // const Month = time.getMonth() + 1;
    // const date = time.getDate();
    // const dateFormat = ` ${Year}-${Month}-${date} `;

    let checkboxId = "myCheckbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
    let todoId = "todo" + todo.uniqueId;

    let todoItem = document.createElement("li");
    todoItem.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItem.id = todoId;
    todoItemsContainerEle.appendChild(todoItem);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    inputElement.onclick = function() {
        onTodoStatusChanged(checkboxId, labelId, todoId);
    };
    todoItem.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoItem.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.append(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-item");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

    let para = document.createElement('p');
    para.id = "timeEle";
    para.textContent = `Created Date: ${time}`;
    para.classList.add("ml-4", "bg-outline-info");
    todoItem.appendChild(para);

}

for (let todo of todoList) {
    appendAndDisplayTodoItems(todo);
}

function addTodoItem() {
    let userInputEle = document.getElementById("todoUserInput");
    let userInputVal = userInputEle.value;
    todoCount = todoCount + 1;
    if (userInputVal === "") {
        alert("Enter Valid Input");
        return;
    }
    let date = new Date();
    let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let newTodo = {
        text: userInputVal,
        uniqueId: todoCount,
        isChecked: false,
        time: formattedDate
    };
    todoList.push(newTodo);
    appendAndDisplayTodoItems(newTodo);
    userInputEle.value = "";
}

let addTodoBtnEle = document.getElementById("addTodo");
addTodoBtnEle.onclick = function() {
    addTodoItem();
}