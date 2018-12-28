function geoFindMe(){
  function positionFind(position){
    //lat and long value passed in the geo function
    geo(position.coords.latitude,position.coords.longitude)
  }
  //check if browswer support geolocation
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(positionFind)
  }
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
    console.log(response.data.results[1].address_components[0].long_name)
    document.querySelector('.message').innerHTML=response.data.results[1].address_components[0].long_name;
    currentTemp(response.data.results[1].address_components[0].long_name)
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
    document.getElementById('temp').textContent=response.data.main.temp;
    document.getElementById('location').textContent=place;
    document.querySelector('.message').classList.add('apply');
  })
}
