const fetch = import("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");



app.get('/', (req, res) => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=7bc7b1073968566379e429f067b344f9').then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        //return response.json();
        console.log(response.data.wind.speed);
        res.send(response.data);


    }).then(function (data) {
        if (data === "success") {
            this.setState({ msg: "User has been deleted." });
        }
    }).catch(function (err) {
        console.log(err)
    });



});

//Webhook function structure
app.post("/start", express.json(), (req, res) => {
    //calling intent tag
    console.log(req.body.fulfillmentInfo.tag);
    //parameter
    //const par = req.body.sessionInfo.parameters.person;
    // const city = req.body.sessionInfo.parameters.city;
    // console.log(par);

    fetch("https://api.instantwebtools.net/v1/airlines")
        .then((response) => {
            console.log(response)

        })
        .catch(function (err) {
            console.log("Unable to fetch -", err);
        });

    const msg = "hello welcome"
    const jsonResponse = {
        fulfillment_response: {
            messages: [{
                text: {
                    text: ['msg'],
                }
            }]
        },
    };
    res.json(jsonResponse);

});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});