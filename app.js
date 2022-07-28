const fetch = import("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");



app.get('/', (req, res) => {
    axios.get('https://api.weatherapi.com/v1/current.json?key=c9f18800ca584669bf672623222706&q=delhi').then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        //return response.json();
        console.log(response);
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
app.post("/getweather", express.json(), (req, res) => {
    //calling intent tag
    console.log(req.body.fulfillmentInfo.tag);
    //parameter

    const city = req.body.sessionInfo.parameters.city;

    console.log("city fetched" + city);

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
    res.status(200).send(jsonResponse);
    console.log(jsonResponse);

});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});