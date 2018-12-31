const unit="<sup>0</sup>";
window.onload = function () {
  // if (localStorage.getItem("hasCodeRunBefore") === null) {
    function positionFind(position){
      //lat and long value passed in the geo function
      geo(position.coords.latitude,position.coords.longitude)
    }
    //check if browswer support geolocation
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(positionFind)
    }
  //   localStorage.setItem("hasCodeRunBefore", true);
  // }
}
function geo (lat,long){
  //axios is used to make a request from js file
  axios.get('https://maps.googleapis.com/maps/api/geocode/json?',{
    params:{
      latlng:lat+','+long,
      key:MAP_KEY,
      result_type:'political',
    }
  }).then((response)=>{
    document.querySelector('.message').innerHTML=response.data.results[0].address_components[1].long_name
    document.querySelector('.message').style.visibility="visible"
    currentTemp(response.data.results[0].address_components[1].long_name)
  }).catch((error)=> {
    console.log(error);
  })
}
function currentTemp(place){
  axios.get('http://api.openweathermap.org/data/2.5/weather?',{
    params:{
      q:place,
      units:"metric",
      APPID:WEATHER_KEY
    }
  }).then((response)=>{
    document.querySelector('#text').innerHTML='<p>'+response.data.main.temp +'<sup>o</sup>'+ 'C' +'</p>'
    document.querySelector('.location').textContent=place;
  })
}
