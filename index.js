let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let h2 = document.querySelector("h2");
let now = new Date();
let day = days[now.getDay()];
let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day} ${time}:${minutes}`;

let apiKey = "58a6775f97527351bf6c6966e209be39";
let APIurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
function showTemp(response) {
  console.log(response.data);
  let outside = Math.round(response.data.main.temp);
  let newfeel = Math.round(response.data.main.feels_like);
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let temp = document.querySelector("div.col-sm");
  let feeltemp = document.querySelector("#feel");
  let Wind = document.querySelector("#wind");
  let Humidity = document.querySelector("#humidity");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  temp.innerHTML = `${outside}`;
  feeltemp.innerHTML = `${newfeel}`;
  Wind.innerHTML = `${wind}`;
  Humidity.innerHTML = `${humidity}`;
}

function city(event) {
  event.preventDefault();
  let anouther = document.querySelector("#enterCity");
  let loc = `${anouther.value}`;
  axios.get(`${APIurl}&q=${loc}&appid=${apiKey}`).then(showTemp);
}
let newCity = document.querySelector("#city");
newCity.addEventListener("submit", city);

function Show(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios.get(`${APIurl}&lat=${lat}&lon=${lon}&appid=${apiKey}`).then(showTemp);
}

function currentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(Show);
}
let newLoc = document.querySelector("#current");
newLoc.addEventListener("click", currentLoc);

function convert() {
  let tempC = document.querySelector("div.col-sm");
  let fake = tempC.innerHTML;
  let fahrenheit = Math.round((fake * 9) / 5 + 32);
  tempC.innerHTML = `${fahrenheit}`;
}
let tempF = document.querySelector("#tempF");
tempF.addEventListener("click", convert);

function convertback() {
  let tempC = document.querySelector("div.col-sm");
  let fake = tempC.innerHTML;
  let fakeone = Math.round(((fake - 32) * 5) / 9);
  tempC.innerHTML = `${fakeone}`;
}
let temp = document.querySelector("#temp");
temp.addEventListener("click", convertback);
