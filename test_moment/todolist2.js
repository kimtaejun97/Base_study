// 혼자 만든 TodoList.

const todo_form = document.querySelector('.todo_form');
const todo_input = todo_form.querySelector('input');
const todo_ul = document.querySelector('.todo_ul');
const del_Bt = document.getElementsByClassName('delBt');

const Todo = [];



function addtodoList(text) {
    let newNum = Todo.length;

    todoObj = {
        text: text,
        id:newNum
    }
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.innerText = "X";
    delBtn.id = newNum;
    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    // li.id=`lis${newNum}`;
    todo_ul.appendChild(li);

    document.getElementById(newNum).addEventListener('click', delTodo);
    Todo.push(todoObj);
    saveTodo();

}


function todohandler(event) {
    event.preventDefault();
    const todotext = todo_input.value;
    addtodoList(todotext);
    todo_input.value = "";
    
}

function saveTodo() {
    let parseTodo = JSON.stringify(Todo);
    localStorage.setItem('TODO_LS', parseTodo);
   
}

function loadTodo() {
    const TODO = localStorage.getItem('TODO_LS');
    if (TODO !== null) {
       const parseTodo = JSON.parse(TODO);
       parseTodo.forEach(function(todo){
           addtodoList(todo.text);
       });

    }
}

// 나는 배열에서 데이터를 삭제한 후 reload를 거쳐 다시 저장된 데이터들만 불러오는 방법을 사용함. ->
// 그러나 Node.removechild를 이용하여 btn의 부모로부터 그 자식인 데이터를 삭제하고, TOdo 배열을 변경한 후 local데이터를 save를 이용하여 수정하여도 됨. 
function delTodo(event) {
    delnum =parseInt(event.toElement.id);
    Todo.splice(delnum,1);
    saveTodo();
    
    location.reload(true);

}

function init() {

    loadTodo();
    todo_form.addEventListener('submit', todohandler);
    
}

init();


