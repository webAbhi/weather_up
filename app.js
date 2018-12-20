const express = require('express')
const app=express()
const request = require('request');

request('http://api.openweathermap.org/data/2.5/weather?q=bangalore&units=metric&APPID=2cb188848466dee1ad22eefdd09126aa',function(error,response,body){
  if(error){
    console.log('something is wrong')
    console.log(error)
  }
  else if (response.statusCode==200){
    let newbody=JSON.parse(body)
    console.log(newbody["main"]['temp'])
  }
})

app.listen(3000, () => console.log("app listening on port 3000"))
