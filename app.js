
const express = require('express')
const app=express()
const request = require('request')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
let location="chennai"
app.use(express.static(__dirname + '/views'))
// app.use(express.json())
// app.use(express.urlencoded())
app.set("view engine","ejs")

app.post('/run',function(req,res){
  location=req.body.place
  res.redirect('/')
})

app.get('/', function (req,res){

  request('http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&APPID=2cb188848466dee1ad22eefdd09126aa',function(error,response,body){
    if(!error  &&  response.statusCode==200){
      let newbody=JSON.parse(body)
      let data={
        "temp":newbody["main"]['temp'],
        "name":newbody["name"]
      };
      res.render('result',{data:data})
      console.log(data)
    }
  })
})
// navigator.geolocation.getCurrentPosition(function(location) {
//   console.log(location.coords.latitude);
//   console.log(location.coords.longitude);
//   console.log(location.coords.accuracy);
// });

app.listen(3000, () => console.log("app listening on port 3000"))
