let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
let APIurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
function showTemp(response) {
  console.log(response.data);
  celsius = response.data.main.temp;
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

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let timezone = response.data.timezone;
  let now = new Date();
  let localtime = new Date(now.getTime() + timezone * 1000);
  let day = days[localtime.getDay()];
  let time = localtime.getUTCHours();
  if (time < 10) {
    time = `0${time}`;
  }
  let minutes = localtime.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${time}:${minutes}`;
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

function convert(event) {
  event.preventDefault();
  let tempC = document.querySelector("div.col-sm");
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  tempC.innerHTML = `${fahrenheit}`;
  temp.classList.remove("active");
  tempF.classList.add("active");
}
let tempF = document.querySelector("#tempF");
tempF.addEventListener("click", convert);

function convertback(event) {
  event.preventDefault();
  let tempC = document.querySelector("div.col-sm");
  let fakeone = Math.round(celsius);
  tempC.innerHTML = `${fakeone}`;
  tempF.classList.remove("active");
  temp.classList.add("active");
}
let temp = document.querySelector("#temp");
temp.addEventListener("click", convertback);
