window.onload = function () {
  // if (localStorage.getItem("hasCodeRunBefore") === null) {
  async function positionFind(position){
    //lat and long value passed in the weather function
    await weather(position.coords.latitude,position.coords.longitude)
  }
  //check if browswer support geolocation
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(positionFind)
  }
}
async function weather(lat,lon){
  // API call
  let data=await fetch('https://api.openweathermap.org/data/2.5/weather?'+'&lat='+lat+'&lon='+lon+'&units=metric'+'&APPID='+WEATHER_KEY)
  const res= await data.json();
  document.querySelector('li:nth-child(1)').innerHTML="Location: "+res.name+', '+res.sys.country;
  document.querySelector('li:nth-child(2)').innerHTML="Temperature: "+res.main.temp+"<sup>o</sup>C";
  document.querySelector('li:nth-child(3)').innerHTML="Description: "+res.weather[0].description;
  document.querySelector('li:nth-child(5)').innerHTML="Humidity: "+res.main.humidity;
  document.querySelector('li:nth-child(4)').innerHTML="Pressure: "+res.main.pressure+" hpa";
}
