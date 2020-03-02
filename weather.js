const weather = document.querySelector(".js-waether");

const API_KEY = "37fec7874285d063819dbef61123bc4a";
const COORDS = "coords";

// 새로고침 없이 데이터 가져오는 함수
function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, 
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){  
    askForCoords();
    } else {
        // getWeather 함수 호출
       const parsedCoords = JSON.parse(loadedCoords);
       getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init() {
    loadCoords();
} 

init();
