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


var futureContainerEl = document.querySelector(".future-container");
var futureBoxEl = document.querySelector(".future-box");
var getWeatherInfo = function(city, lat, lon) {
    apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid=cf5d67cbcf13a4639df8ab5a787fe6cf";
    
    
    fetch(apiUrl).then(function (response) {
        response.json().then(function(data) {
            date = new Date();
            date = date.toLocaleString().substring(0, 9);
            forecastHeader(city, date);

            var temp = data.current.temp;
            temp = (temp - 273.15) * 9/5 + 32;
            temp = temp.toFixed(2);
            var humid = data.current.humidity; 
            windSpeed = data.current.wind_speed;
            UV = data.current.uvi; 
            futureContainerEl.innerHTML = "";           
            forecastDisplay(temp, humid, windSpeed, UV);
            
            for (var i = 0; i < 5; i++) {
                
                var futureTemp = data.daily[i].temp.day;
                futureTemp = (futureTemp - 273.15) * 9/5 + 32;
                futureTemp = futureTemp.toFixed(2);
                var futureWind = data.daily[i].wind_speed;
                var futureHumidity = data.daily[i].humidity;

                // create a future weather box div
                var futureDisplayEl = document.createElement("div");
                futureDisplayEl.classList = "col-2 future-box"

                var futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + i + 1);
                futureDate = futureDate.toLocaleString().substring(0, 9);
                console.log(futureDate);
                // create date header
                var futureDateEl = document.createElement("h4");
                futureDateEl.textContent = futureDate;
                // create p items to display info
                var futureTempDisplay = document.createElement("p");
                futureTempDisplay.textContent = "Temp: " + futureTemp + " °F";
                var futureWindDisplay = document.createElement("p");
                futureWindDisplay.textContent = "Wind: " + futureWind + " MPH";
                var futureHumidityDisplay = document.createElement("p");
                futureHumidityDisplay.textContent = "Humidity: " + futureHumidity + "%";

                // append to container
                futureDisplayEl.appendChild(futureDateEl);
                futureDisplayEl.appendChild(futureTempDisplay);
                futureDisplayEl.appendChild(futureWindDisplay);
                futureDisplayEl.appendChild(futureHumidityDisplay);
                futureContainerEl.appendChild(futureDisplayEl);

                //futureWeatherConditions(futureTemp, futureWind, futureHumidity)
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
    temperature.textContent = temp + " °F";
    var humidity = document.querySelector(".humidity");
    humidity.textContent = humid + "%";
    var wind = document.querySelector(".wind");
    wind.textContent = windSpeed + " MPH";
    var uvIndex = document.querySelector(".uv-index");
    uvIndex.textContent = UV;
}

userFormEl.addEventListener("submit", formSearchHandler);