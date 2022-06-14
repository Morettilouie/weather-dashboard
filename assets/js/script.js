var getWeatherInfo = function() {
    var apiUrl = "http://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units={units}"

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");

var formSearchHandler = function(event) {
    event.preventDefault();

    cityName = cityInputEl.value.trim();

    if (cityName) {
        getWeatherInfo(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.")
    }
};

userFormEl.addEventListener("submit", formSearchHandler);