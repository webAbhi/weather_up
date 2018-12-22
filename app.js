
const express = require('express')
const app=express()
const request = require('request')
app.set("view engine","ejs");
// app.use(express.static(__dirname + '/view'))
app.get('/',function(req,res){
  request('http://api.openweathermap.org/data/2.5/weather?q=kanpur&units=metric&APPID=2cb188848466dee1ad22eefdd09126aa',function(error,response,body){
    if (!error && response.statusCode==200){
      var newbody=JSON.parse(body)


      // newbody["main"]['temp'];
      var some="yello"
      res.render("result",{some:some});
      console.log('success')
    }
  })
})





app.listen(3000, () => console.log("app listening on port 3000"))
