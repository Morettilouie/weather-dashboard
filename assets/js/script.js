var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");

var formSearchHandler = function(event) {
    event.preventDefault();

    cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityInfo(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.")
    }
};
var getCityInfo = function(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=cf5d67cbcf13a4639df8ab5a787fe6cf";

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    });
};
var getWeatherInfo = function(lat, lon) {
    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid=cf5d67cbcf13a4639df8ab5a787fe6cf";
    
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })
    })
}

userFormEl.addEventListener("submit", formSearchHandler);