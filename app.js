const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
   res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName ;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4d4206ae45cf6ac0fe6f7bf60074a5bd&units=metric";
https.get(url, function(response) {
  console.log(response.statusCode);

  response.on("data", function(data) {

    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp ;
    const details = weatherData.weather[0].description;
    const iconic = weatherData.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/wn/"+iconic+"@2x.png";
    console.log(temp);
    console.log(details);

    res.write("<h1> The Temperature In "+query+" is "+temp+" degree Celcius</h1>")
    res.write("<p>The Weather Description is "+ details +"</p>" )
    res.write("<img src = "+iconUrl+">")

    res.send()
  });

});
})

app.listen(3000, function() {
  console.log("Server is Up at port 3000.");
});
