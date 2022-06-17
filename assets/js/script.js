var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");

var formSearchHandler = function(event) {
    event.preventDefault();

    cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityInfo(cityName);
        //cityInputEl.value = "";
    } else {
        alert("Please enter a city.")
    }
};
var getCityInfo = function(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=cf5d67cbcf13a4639df8ab5a787fe6cf";

    fetch(apiUrl).then(function (response) {
        response.json().then(function(data) {
            getWeatherInfo(city, data[0].lat, data[0].lon);
        });
    });
};
var getWeatherInfo = function(city, lat, lon) {
    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid=cf5d67cbcf13a4639df8ab5a787fe6cf";
    
    fetch(apiUrl).then(function (response) {
        response.json().then(function(data) {
            date = Date()
            //console.log(data);
            forecastHeader(city, date);

            var temp = data.current.temp;
            temp = (temp - 273.15) * 9/5 + 32;
            var humid = data.current.humidity; 
            windSpeed = data.current.wind_speed;
            UV = data.current.uvi;            
            console.log(temp, humid, windSpeed, UV);
        })
    })
}
var forecastHeader = function(city, date) {
    var currentForecast = document.querySelector("#current-forecast");
    var header = currentForecast.createElement("h3");
    header.textcontent = city +", "+ date;
}

userFormEl.addEventListener("submit", formSearchHandler);