
const express = require('express')
const app=express()
const request = require('request')
app.set("view engine","ejs")
app.get('/test',function(req,res){
  request('http://api.openweathermap.org/data/2.5/weather?q=bangalore&units=metric&APPID=2cb188848466dee1ad22eefdd09126aa',function(error,response,body){
    if(!error  &&  response.statusCode==200){
      let newbody=JSON.parse(body)
      let data=newbody["main"]['temp']
      res.render('result',{data:data})
    }
  })
})
app.listen(3000, () => console.log("app listening on port 3000"))
