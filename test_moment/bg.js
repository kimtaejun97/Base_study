const body = document.querySelector('body');


const IMG_NUMBER =4;

function getRandom(){
    const number = Math.ceil(Math.random()*IMG_NUMBER);
    return number;

}

function paintImg(num){
    const Img = new Image();
    Img.classList.add('bgImg');
    Img.src = `img/${num}.jpg`;
    body.appendChild(Img);
    
}

function init(){
    const imgNum = getRandom();
    paintImg(imgNum);
}

init();

