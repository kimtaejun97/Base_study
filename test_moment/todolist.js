// 혼자 만든 TodoList.

const todo_form = document.querySelector('.todo_form');
const todo_input = todo_form.querySelector('input');
const todo_ul = document.querySelector('.todo_ul');
const del_Bt = document.getElementsByClassName('delBt');



function addtodoList(text, i) {
    let num =i;
    if(num == null){
        if (localStorage.getItem('listNum') === null || localStorage.getItem('listNum') === '0')
            num = 1;
        else 
            num = parseInt(localStorage.getItem('listNum')) + 1 
    }
   
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.innerText = "X";
    delBtn.id = num;
    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=`lis${num}`;
    todo_ul.appendChild(li);

    document.getElementById(num).addEventListener('click', delTodo);

}


function todohandler(event) {
    event.preventDefault();
    const todotext = todo_input.value;
    addtodoList(todotext);
    todo_input.value = "";
    saveTodo(todotext, null);
}

function saveTodo(text) {
    // list count를 증가시켜 리스트 수와 내용을 저장함.
    if (localStorage.getItem('listNum') === null) {
        localStorage.setItem('listNum', 1);
        localStorage.setItem(`TODO_LS1`, text);
    }
    else {
        let listnum = parseInt(localStorage.getItem('listNum')) + 1;
        localStorage.setItem('listNum', listnum);
        localStorage.setItem(`TODO_LS${listnum}`, text);
    }
}

function loadTodo() {
    const TODO = localStorage.getItem('TODO_LS1');
    if (TODO !== null) {
        listnum = localStorage.getItem('listNum');
        for (let i = 1; i <= listnum; i++) 
            addtodoList(localStorage.getItem(`TODO_LS${i}`), i)

    }
}

function delTodo(event) {
    delnum =parseInt(event.toElement.id);
    document.getElementById(`lis${delnum}`).style.display= 'none';
    document.getElementById(delnum).style.display = 'none';
    
    numlist = localStorage.getItem('listNum');
    for(let i = delnum; i<numlist; i++){
        localStorage.setItem(`TODO_LS${i}`,localStorage.getItem(`TODO_LS${i+1}`));
    }
    localStorage.removeItem(`TODO_LS${numlist}`);
    localStorage.setItem('listNum', (parseInt(numlist)-1));
    location.reload(true);

}

function init() {

    loadTodo();
    todo_form.addEventListener('submit', todohandler);
    
}

init();


