//API INfo

var APIkey = '029ebfdad5031584e276491af5ece7a6';

var city_name = localstorage.getItem("lastResult");

var queryURL = `api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIkey}`;

var fiveDayQuery = `api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${APIkey}`

//Display current date
var currentDay = moment().format("dddd, MMM Do");

function displayDate() {
    $(".current-day").text(currentDay);
};

displayDate();

//Search

var searchInput = document.querySelector('.input');
var recentSearches = document.querySelector('.output');

$(".submit").click(searchFunc);

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
$.$.ajax({
    type: "GET",
    url: queryURL,
    success: function (response) {
        
    }
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

    var long = resp.coord.lon;
    var lat = resp.coord.lat;
    var queryUV = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&lon=" + long + APIKey;

    $.ajax({
        type: "GET",
        url: queryUV,
    }).then(function(resp){
        console.log(resp);

        $(".uv").html("UV Index: " + resp.value);

    });
});