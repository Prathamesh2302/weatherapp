const { request } = require("express");

request(`https://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=7bc7b1073968566379e429f067b344f9&cnt=5`, (error, response, body) => {
    let data = JSON.parse(body);
    let weather = {
        0: [day, highTemp, lowTemp, rain],
        1: [day, highTemp, lowTemp, rain],
        2: [day, highTemp, lowTemp, rain],
        3: [day, highTemp, lowTemp, rain],
        4: [day, highTemp, lowTemp, rain],
    }
    // day 1
    console.log(data['city']['name']);
    console.log(data['list'][0].dt_txt);
    console.log(data['list'][0].main['temp']);

    // day 2
    console.log(data['city']['name']);
    console.log(data['list'][8].dt_txt);
    console.log(data['list'][8].main['temp']);
    // day 3
    console.log(data['city']['name']);
    console.log(data['list'][16].dt_txt);
    console.log(data['list'][16].main['temp']);
    // day 4
    console.log(data['city']['name']);
    console.log(data['list'][24].dt_txt);
    console.log(data['list'][24].main['temp']);
    // day 5
    console.log(data['city']['name']);
    console.log(data['list'][32].dt_txt);
    console.log(data['list'][32].main['temp']);

});