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
            console.log(data);
            forecastHeader(city, date);

            var temp = data.current.temp;
            temp = (temp - 273.15) * 9/5 + 32;
            var humid = data.current.humidity; 
            windSpeed = data.current.wind_speed;
            UV = data.current.uvi;            
            forecastDisplay(temp, humid, windSpeed, UV);

            for (var i = 0; i < 5; i++) {
                var futureTemp = data.daily[i].temp.day;
                console.log(futureTemp);
                var futureWind = data.daily[i].wind_speed;
                console.log(futureWind);
                var futureHumidity = data.daily[i].humidity;
                console.log(futureHumidity);
                futureWeatherConditions(futureTemp, futureWind, futureHumidity)
            };
        })
    })
}
var forecastHeader = function(city, date) {
    //var currentForecast = document.querySelector("#current-forecast");
    //var header = currentForecast.createElement("h3");
    //header.textcontent = city +", "+ date;
    var header = document.querySelector("#city-header");
    header.textContent =  city+" "+ date;
}

var forecastDisplay = function(temp, humid, windSpeed, UV) {
    var temperature = document.querySelector(".temp");
    temperature.textContent = temp + " F";
    var humidity = document.querySelector(".humidity");
    humidity.textContent = humid + "%";
    var wind = document.querySelector(".wind");
    wind.textContent = windSpeed + " MPH";
    var uvIndex = document.querySelector(".uv-index");
    uvIndex.textContent = UV;
}
// need to figure out how to get each value seperately
var futureWeatherConditions = function(futureTemp, futureWind, futureHumidity) {
    console.log(futureTemp)
}

userFormEl.addEventListener("submit", formSearchHandler);