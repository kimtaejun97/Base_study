const weather = document.querySelector('.js-weather');

const API_KEY = "8fd0993fbc022504acc26e7502aa652c";
const COORDS = 'coords'


function getWeather(lat, lngt){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lngt}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place= json.name;
        weather.innerText = `${place} @ ${temperature} ºC`
    })
}

function handleGeoerror(position){
    console.log('access Fail')
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude =position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj ={
        latitude:latitude,
        longitude:longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoerror)
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS)
    if(loadedCords ===null){
        askForCoords();
    }
    else{
        const parseCoods = JSON.parse(loadedCords);
        getWeather(parseCoods.latitude,parseCoods.longitude);
    }
}


function init(){
    loadCoords();
}

init();