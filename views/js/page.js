  window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
      function positionFind(position){
        //lat and long value passed in the geo function
        geo(position.coords.latitude,position.coords.longitude)
        pageShowed="true";
      }
      //check if browswer support geolocation
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positionFind)
      }
      localStorage.setItem("hasCodeRunBefore", true);
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
    document.querySelector('.message').textContent=response.data.results[1].address_components[1].long_name

    currentTemp(response.data.results[1].address_components[1].long_name)
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
    document.querySelector('.content > h2').textContent=response.data.main.temp +"oc";
    document.querySelector('.location').textContent=place;
  })
}
