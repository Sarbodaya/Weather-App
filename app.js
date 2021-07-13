const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const cityName = req.body.cityName;
    const unit = "metric"
    const apiKey = "37da44aaf1280fa14cd3c509fb5644ef"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&units="+unit+"&appid="+apiKey;

    https.get(url,function(response){
        response.on("data",function(data){

            const weatherData = JSON.parse(data);
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const temp = weatherData.main.temp;
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The Weather Description " + weatherDesc + "</p>");
            res.write("<h1>The temperature in"+cityName+" is " + temp + " degree Celcius.</h1>");
            res.write("<img src = " + imgURL +">");

        });
    });
})




app.listen(3000,function(){
    console.log("Server is running on port 3000");
});