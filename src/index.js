let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentTime.getDay()];
let lidate = document.querySelector("#li-date");
lidate.innerHTML = `${currentDay} ${currentTime.getHours()} :${currentTime.getSeconds()} `;

function search(event) {
  event.preventDefault();
  let txts = document.querySelector("#txt-search");
  getCitytemp(txts.value);
}
let schform = document.querySelector("#search-form");
schform.addEventListener("submit", search);

///////
function getCitytemp(Pcity) {
  function showTemperature(response) {
    console.log(response);

    let city = response.data.name;
    let temp = Math.round(response.data.main.temp);
    let humidity = Math.round(response.data.main.humidity);
    let description = response.data.weather[0].description;
    let wind = Math.round(response.data.wind.speed);
    let icon = response.data.weather[0].icon;

    celsiusTemperature = response.data.main.temp;

    let h1 = document.querySelector("h1");
    h1.innerHTML = city;
    let templabel = document.querySelector("#temp");
    templabel.innerHTML = temp;
    let humiditylabel = document.querySelector("#humidity");
    humiditylabel.innerHTML = humidity;
    let descriptionlabel = document.querySelector("#description");
    descriptionlabel.innerHTML = description;
    let windlabel = document.querySelector("#wind");
    windlabel.innerHTML = wind;
    let iconlabel = document.querySelector("#icon");
    iconlabel.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
  }

  let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${Pcity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
////////////////////Bonus point:
function current(event) {
  //event.preventDefault();

  var longitude;
  var Latitude;
  function showPosition(position) {
    longitude = position.coords.longitude;
    Latitude = position.coords.latitude;
    console.log(
      `Your Latitude is ${longitude} and your longitude is ${Latitude}`
    );
    ///////2
    function showCurrentTemp(response) {
      console.log(response);
      let currentcity = response.data.name;
      getCitytemp(currentcity);
    }

    let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
    let units = "metric";

    let currentApiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(currentApiurl).then(showCurrentTemp);

    let txts = document.querySelector("#txt-search");
    txts.value = "";
  }
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  getCurrentPosition();
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let btncurrent = document.querySelector("#current");
btncurrent.addEventListener("click", current);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
getCitytemp("paris");
