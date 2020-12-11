//API INfo
console.log("hi there");
let apiKey = "029ebfdad5031584e276491af5ece7a6";
let searchBtn = $(".btn");
let searchInput = $(".input");

//search box variables
let currCity = $(".city");
let currDay = $(".current-day");
let weatherIconEl = $(".icon");
let searchHistoryEl = $(".output");

//right side
let tempEl = $(".temp");
let humidityEl = $(".humidity");
let windSpeedEl = $(".wind");
let uvIndexEl = $(".uv");
let cardRow = $(".card-row");

// var city_name = localStorage.getItem("lastResult");

//Display current date
var currentDay =  new Date();
let day = String(currentDay.getDate()).padStart(2, '0');
let month = String(currentDay.getMonth() + 1).padStart(2, '0');
let year = currentDay.getFullYear();
var currentDay = day + '/' + month + '/' + year;

// function displayDate() {
//     $(".current-day").html(currentDay);
// };

// displayDate();

//Search

// var searchInput = document.querySelector('.input');
// var recentSearches = document.querySelector('.output');

//saves history is there is any and displays it on page
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
}else{
    console.log("searchHistory loaded into searchHistoryArr");
    renderSearchHistory();
}

//main function gets handled from button click
searchBtn.on("click", function(e) {
    e.preventDefault();
    if (searchInput.val() === "") {
        alert("You must enter a city");
        return;
    }
    console.log("this worked")
    getTheWeather(searchInput.val());

    //A stupid Easter egg... you just have to search new haven twice
    if ($(".city").text() === "New Haven") {
        $(".dr-mel").html("<img src='./Assets/dr_mel.jpg' alt='Weatherman'>");
    }

});

//You can search by clicking the history buttons
$(document).on("click", ".historyEntry", function() {
    console.log("clicked history item")
    let thisElement = $(this);
    getTheWeather(thisElement.text());
    
})

function renderSearchHistory(cityName) {
    searchHistoryEl.empty();
    let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (let i = 0; i < searchHistoryArr.length; i++) {
        // We put newListItem in loop because otherwise the text of the li element changes, rather than making a new element for each array index
        let newListItem = $("<li>").attr("class", "historyEntry");
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(newListItem);
    }
    if (searchHistoryArr.length > 3){
        searchHistoryArr.pop();
    }
}

//poopulate weather data on the right side
function populateWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    currCity.text(cityName)
    currDay.text(`(${currentDay})`)
    tempEl.text(`Temperature: ${cityTemp} °F`);
    humidityEl.text(`Humidity: ${cityHumidity}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
    uvIndexEl.text(`UV Index: ${uvVal}`);
    weatherIconEl.attr("src", cityWeatherIcon);

}

function getTheWeather(desiredCity) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(weatherData) {
        let cityObj = {
            cityName: weatherData.name,
            cityTemp: weatherData.main.temp,
            cityHumidity: weatherData.main.humidity,
            cityWindSpeed: weatherData.wind.speed,
            cityUV: weatherData.coord,
            cityWeatherIconName: weatherData.weather[0].icon
        }
    let queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUV.lat}&lon=${cityObj.cityUV.lon}&APPID=${apiKey}&units=imperial`
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(uvData) {
        if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
            let searchHistoryArr = [];
            // Keeps user from adding the same city to the searchHistory array list more than once
            if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                searchHistoryArr.push(cityObj.cityName);
                // store our array of searches and save 
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                populateWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                renderSearchHistory(cityObj.cityName);
            }else{
                console.log("City already in searchHistory. Not adding to history list")
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                populateWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }
        }else{
            let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
            // Keeps user from adding the same city to the searchHistory array list more than once
            if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                searchHistoryArr.push(cityObj.cityName);
                // store our array of searches and save 
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                populateWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                renderSearchHistory(cityObj.cityName);
            }else{
                console.log("City already in searchHistory. Not adding to history list")
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                populateWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }
        }
    })
        
    });
    getFiveDayForecast();

    function getFiveDayForecast() {
        cardRow.empty();
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(fiveDayReponse) {
            for (let i = 0; i != fiveDayReponse.list.length; i+=8 ) {
                let cityObj = {
                    date: fiveDayReponse.list[i].dt_txt,
                    icon: fiveDayReponse.list[i].weather[0].icon,
                    temp: fiveDayReponse.list[i].main.temp,
                    humidity: fiveDayReponse.list[i].main.humidity
                }
                let dateStr = cityObj.date;
                let trimmedDate = dateStr.substring(0, 10); 
                let weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
                createForecastCard(trimmedDate, weatherIco, cityObj.temp, cityObj.humidity);
            }
        })
    }   
}


function createForecastCard(date, icon, temp, humidity) {

    // Adds the 5 day forcast to the page
    let fiveDayCard = $("<div>").attr("class", "five-day-card col-md-2 card-body bg-info rounded text-sm-center m-2");
    let cardDate = $("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "weatherIcon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(fiveDayCard);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} °F`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    fiveDayCard.append(cardDate, cardIcon, cardTemp, cardHumidity);
}
