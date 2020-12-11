//API INfo

let apiKey = "029ebfdad5031584e276491af5ece7a6";
let searchBtn = $(".btn");
let searchInput = $(".input");

//search box variables
let currCity = $(".currCity");
let currDay = $(".current-day");
let weatherIconEl = $(".weatherIcon");
let searchHistoryEl = $(".output");

//right side
let tempEl = $(".temp");
let humidityEl = $(".humidity");
let windSpeedEl = $(".wind");
let uvIndexEl = $(".uv");
let cardRow = $(".card-row");

var city_name = localStorage.getItem("lastResult");

var queryURL = `api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${APIkey}`;

var fiveDayQuery = `api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${APIkey}`

//Display current date
var currentDay = moment().format("dddd, MMM Do");

function displayDate() {
    $(".current-day").html(currentDay);
};

displayDate();

//Search

var searchInput = document.querySelector('.input');
var recentSearches = document.querySelector('.output');


//main function gets handled from button click
searchBtn.on("click", function(e) {
    e.preventDefault();
    if (searchInput.val() === "") {
        alert("You must enter a city");
        return;
    }
    console.log("this worked")
    getTheWeather(searchInput.val());
});

function searchFunc() {
    localStorage.setItem(searchInput.value, searchInput.value);
    localStorage.setItem("lastResult", searchInput.value);
}

//output searched items to page for refernce
//TODO: find a way to delete items after 3 cities have been searched
//so only 3 are ever shown
for (var i=0; i < localStorage.length; i++){
    $(".output").append("<p class='citiesSearched'>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}

//API Calls to...well...the Open Weather API
$.ajax({
    type: "GET",
    url: queryURL,
}).then (function(resp) {
    console.log(resp);

    $(".city").html("<h2/>" + resp.name);

    //If User searches for weather in New Haven a pic of Dr. Mel is displayed
    if (resp.name === "New Haven") {
        $(".dr-mel").html("<img src='./Assets/dr_mel.jpg alt='New Haven\'s Weatherman'");
    };

    $(".icon").html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Current weather icon.");
    $(".wind").html("Wind Speed: " + resp.wind.speed + " MPH");
    $(".humitity").html("Humidity: " + resp.main.humidity + "%");

    //temp conversion
    var tempF = (resp.main.temp - 273.15) * 1.8 + 32;
    $(".temp").text("Temp: " + Math.round(tempF) + " °F");

    // var long = resp.coord.lon;
    // var lat = resp.coord.lat;
    // var queryUV = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&lon=" + long + APIKey;

    // $.ajax({
    //     type: "GET",
    //     url: queryUV,
    // }).then(function(resp){
    //     console.log(resp);

    //     $(".uv").html("UV Index: " + resp.value);

    // });
});

$.ajax({
    type: "GET",
    url: fiveDayQuery,
}).then(function(response) {
    resp.prevent
    console.log(response);
    var dayOne = moment(response.list[0].dt_txt).format("ddd, MMM D");
    console.log(moment(response.list[0].dt_txt).format("ddd, MMM D"));

    // Transfer day 1 content to HTML
    $(".day-one-date").html("<h6>" + dayOne + "</h6>");
    $(".day-one-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".day-one-humidity").text("Humidity: " + response.list[0].main.humidity + "%");

    // Converts the temp to Kelvin with the below formula
    var tempOne = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    $(".day-one-temp").text("Temp: " + Math.round(tempOne) + " °F");

    var dayTwo = moment(response.list[8].dt_txt).format("ddd, MMM D");

    // Transfer day 2 content to HTML
    $(".day-two-date").html("<h6>" + dayTwo + "</h6>");
    $(".day-two-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".day-two-humidity").text("Humidity: " + response.list[8].main.humidity + "%");

    // Converts the temp to Kelvin with the below formula
    var tempTwo = (response.list[8].main.temp - 273.15) * 1.80 + 32;
    $(".day-two-temp").text("Temp: " + Math.round(tempTwo) + " °F");

    var dayThree = moment(response.list[16].dt_txt).format("ddd, MMM D");

    // Transfer day 3 content to HTML
    $(".day-three-date").html("<h6>" + dayThree + "</h6>");
    $(".day-three-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".day-three-humidity").text("Humidity: " + response.list[16].main.humidity + "%");

    // Converts the temp to Kelvin with the below formula
    var tempThree = (response.list[16].main.temp - 273.15) * 1.80 + 32;
    $(".day-three-temp").text("Temp: " + Math.round(tempThree) + " °F");

    var dayFour = moment(response.list[24].dt_txt).format("ddd, MMM D");

    // Transfer day 4 content to HTML
    $(".day-four-date").html("<h6>" + dayFour + "</h6>");
    $(".day-four-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".day-four-humidity").text("Humidity: " + response.list[24].main.humidity + "%");

    // Converts the temp to Kelvin with the below formula
    var tempFour = (response.list[24].main.temp - 273.15) * 1.80 + 32;
    $(".day-four-temp").text("Temp: " + Math.round(tempFour) + " °F");

    var dayFive = moment(response.list[32].dt_txt).format("ddd, MMM D");

    // Transfer day 5 content to HTML
    $(".day-five-date").html("<h6>" + dayFive + "</h6>");
    $(".day-five-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    $(".day-five-humidity").text("Humidity: " + response.list[32].main.humidity + "%");

    // Converts the temp to Kelvin with the below formula
    var tempFive = (response.list[32].main.temp - 273.15) * 1.80 + 32;
    $(".day-five-temp").text("Temp: " + Math.round(tempFive) + " °F");
})