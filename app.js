const fetch = import("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");
app.get('/', (req, res) => {
    console.log("We are live");

    res.status(200).send("We are live!!!");

});

//Webhook for getting temperature of city
app.post("/getweather", express.json(), (req, res) => {
    //calling intent tag
    console.log(req.body.fulfillmentInfo.tag);
    //parameter
    const city = req.body.sessionInfo.parameters.city;
    console.log("city fetched" + city);

    axios.get(`https://api.weatherapi.com/v1/current.json?key=c9f18800ca584669bf672623222706&q=${city}`)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            else {
                const temp = (response.data.current.temp_c);
                console.log("temperature is " + temp);
                const jsonResponse = {
                    fulfillment_response: {
                        messages: [{
                            text: {
                                text: ["Temperature is " + temp + " degree celcius"],
                            }
                        }]
                    },
                };
                res.status(200).send(jsonResponse);
                console.log(jsonResponse);

            }
            //return response.json();

            // res.send(response.data);



        });



});

// webhoom for weather forercast
app.post("/forecast", express.json(), (req, res) => {
    //calling intent tag
    console.log(req.body.fulfillmentInfo.tag);
    //parameter
    const city = req.body.sessionInfo.parameters.forecastcity;
    console.log("city fetched " + city);

    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=c9f18800ca584669bf672623222706&days=3&q=${city}`)
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            else {
                const wdata = response.data.forecast.forecastday;
                console.log(wdata);
                var str = ""
                for (let i = 0; i < wdata.length; i++) {
                    var str1 = `Date :, ${wdata[i]['date']}
                    Max Temp : , ${wdata[i]['day'].maxtemp_c}
                    Min Temp : , ${wdata[i]['day'].mintemp_c}`

                    str = str + str1;
                }

                const jsonResponse = {
                    fulfillment_response: {
                        messages: [{
                            text: {
                                text: ["Following is the weather forecast for 3 days" + str],
                            }
                        }]
                    },
                };
                res.status(200).send(jsonResponse);
                console.log(jsonResponse);

            }


        });

})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});