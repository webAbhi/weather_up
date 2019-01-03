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

// function geo (lat,long){
//   //axios is used to make a request from js file
//   axios.get('https://maps.googleapis.com/maps/api/geocode/json?',{
//     params:{
//       latlng:lat+','+long,
//       key:MAP_KEY,
//       result_type:'political',
//     }
//   }).then((response)=>{
//     console.log(response.data.results[0])
//     assignValue('place',response.data.results[0])
//     // .address_components[1].long_name
//     // document.querySelector('.message').style.visibility="visible"
//     // console.log(info)
//     currentTemp(info.place)
//   }).catch((error)=> {
//     console.log(error);
//   })

// }
let info
async function weather(lat,lon){
  // API call
  let data=await fetch('http://api.openweathermap.org/data/2.5/weather?'+'&lat='+lat+'&lon='+lon+'&units=metric'+'&APPID='+WEATHER_KEY)
  console.log("inside API")
  const res= await data.json();
  console.log(res)
  let info={}
  Object.defineProperties(info, {
    name: {
      value: res.name,
      writable: false
    },
    temp: {
      value: res.main.temp,
      writable: false
    },
    humidity: {
      value: res.main.humidity,
      writable: false
    },
    pressure: {
      value: res.main.pressure,
      writable: false
    },
    description: {
      value: res.weather[0].description,
      writable: false
    }
  })
  console.log(info)
  var type=new Typed('#text',{
      strings:[info.temp],
      typeSpeed:120,

  })
}
