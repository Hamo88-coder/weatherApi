
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function successFunction(position) {
    let croods = position.coords
    let loc = croods.latitude + ',' + croods.longitude;
    searchOn(loc)
}

function errorFunction() {
    console.log("Unable to retrieve your location");
}
async function searchOn(loc = null) {
    let q = loc ?? document.getElementById('search').value;
    let apiKey = 'd6f14e8f9f934577baf84729242206';
    let days = 3;
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=${days}`);
    if (response.status == 200) {
        var json = await response.json()
        buildForcastCard(json)
    }
    return false
}

function getTheDay (day){
    switch(day){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        default:
            return 'Invalid Day'
    }
}

function getTheMonth (month){
    switch(month){
        case 0:
            return 'January'
        case 1:
            return 'February'
        case 2:
            return 'March'
        case 3:
            return 'April'
        case 4:
            return 'May'
        case 5:
            return 'June'
        case 6:
            return 'July'
        case 7:
            return 'August'
        case 8:
            return 'September'
        case 9:
            return 'October'
        case 10:
            return 'November'
        case 11:
            return 'December'
        default:
            return 'Invalid Month'
    }
}

function buildForcastCard(json) {
    console.log(json)

    let forcastCards = document.getElementsByClassName('forecast');
    for (let i = 0; i < 3; i++) {
        let location = json.location
        let forecast = json.forecast
        let forecastday = forecast.forecastday[i]
        let current = json.current
        let max_c = forecastday.day.maxtemp_c
        let min_c = forecastday.day.mintemp_c

        let icon = forecastday.day.condition.icon

        let weatherTxt = forecastday.day.condition.text

        let date = new Date(Date.parse(forecastday.date))

        if (i == 0) {
            let kmh = forecastday.day.maxwind_kph;
            forcastCards[i].innerHTML = (`
                <div class="forecast-header" id="today">
                            <div class="day">${getTheDay(date.getDay())}</div>
                            <div class=" date">${date.getDate()} ${getTheMonth(date.getMonth())}</div>
                        </div> 
                        <div class="forecast-content" id="current">
                            <div class="location">${location.name}</div>
                            <div class="degree">
                                <div class="num">${max_c}<sup>o</sup>C</div>
                                <div class="forecast-icon">
                                    <img src="https:${icon}" alt="" width="90">
                                </div>
                            </div>
                            <div class="custom">${weatherTxt}</div>
                            <span><img src="images/icon-umberella.png" alt="">20%</span>
                            <span><img src="images/icon-wind.png" alt="">${kmh}km/h</span>
                            <span><img src="images/icon-compass.png" alt="">East</span>
                        </div>
                `);
        } else {
            forcastCards[i].innerHTML = (`
                <div class="forecast-header">
                            <div class="day">Sunday</div>
                        </div> 
                        <div class="forecast-content">
                            <div class="forecast-icon">
                                <img src="https:${icon}" alt="" width="48">
                            </div>
                            <div class="degree">${max_c}<sup>o</sup>C</div>
                            <small>${min_c}<sup>o</sup></small>
                            <div class="custom">${weatherTxt}</div>
                        </div>
                `)
        }
    }
}

document.getElementById('submit').addEventListener('click', function () {
    searchOn()
})

document.getElementById('q-search-form').addEventListener('submit', function () {
    searchOn()
    return false;
})