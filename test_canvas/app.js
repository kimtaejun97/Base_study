const canvas =document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jscolor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle ="black";
ctx.lineWidth =2.5;

ctx.fillstyle = "white";
ctx.fillStyle ="black";

let painting = false;
let filling =true;

function startPainting(event){
    painting = true;
}

function stopPainting(event){
    painting = false;
}

function onMouseMove(event){
    const x =  event.offsetX;
    const y =  event.offsetY;
    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function changeColor(event){
    const color =event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle =color;

}

function rangeHandle(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeHandle(event){
    if(mode.innerText==="Fill"){
        filling = false;
        mode.innerText = "Brush";
    }
    else{
        filling = true;
        mode.innerText = "Fill";
    }
}
function fillingCanvas(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function CMhandler(event){
    event.preventDefault();
}
function saveHandler(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs[EXPORT]";
    link.click();
}


if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener("click", fillingCanvas)
    canvas.addEventListener("contextmenu", CMhandler)
}
Array.from(colors).forEach(color=>
    color.addEventListener("click", changeColor));
if(range){
    range.addEventListener("input", rangeHandle);
}
if(mode){
    mode.addEventListener("click", modeHandle)
}
if(saveBtn){
    saveBtn.addEventListener("click", saveHandler)
}
