
const express = require('express')
const app=express()
const port=process.env.PORT || 3000;
const request = require('request')
const dotenv=require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
let location=""
app.use(express.static(__dirname + '/views'))
app.set("view engine","ejs")
//input form
app.post('/run',function(req,res){
  location=req.body.place
  res.redirect('/foam')
});

app.get('/', function (req,res){
  res.render("initial")
})
// requesting the data from API
app.get('/foam',function (req,res){
  request('http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&APPID='+process.env.WEATHER_KEY,function(error,response,body){
    if(!error  &&  response.statusCode==200){
      let newbody=JSON.parse(body)
      let data={
        "temp":newbody.main.temp,
        "description":newbody.weather[0].description,
        "humidity":newbody.main.humidity,
        "pressure":newbody.main.pressure,
        "name":newbody.name+', '+newbody.sys.country
      };
      console.log(newbody)

      res.render('result',{data:data})
    }
  })
})
app.listen(port, () => console.log("app listening on port 3000"))
