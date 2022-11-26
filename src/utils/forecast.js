const request = require('postman-request');



const forcaste = (latitude,longitude, callback) => {
//65cd504babb25183823ebfb70eeb952c
  const url2=`https://api.openweathermap.org/data/2.5/onecall?lat=`+latitude+`&lon=`+longitude+`&units=metric&appid=000b058bd15e6e5ecc1b1ec8e27244dd`
  const url1=`http://api.weatherstack.com/current?access_key=65cd504babb25183823ebfb70eeb952c&query=`+latitude +`,`+longitude;
  const url = `http://api.positionstack.com/v1/reverse?access_key=cf89e3379d6bc61506ec202843c750b1&query=`+latitude +`,`+longitude;
  request({ url: url2, json: true }, (error, response) => {
      if (error) {
          callback("unable to connect to api ......",undefined);
      }
     //else  if (response.body.latitude.length===0||response.body.longitude.leng) {callback("location not found..",undefined) }
      else {
          callback(
            undefined, 
              
              // "It is currently " +response.body.current.temp + " degree in " + response.body.location.name + ".Humidity is "
              // +response.body.current.humidity+"  feels like "+ response.body.current.feelslike+" degree.Weather is "+response.body.current.weather_descriptions[0]
              "It is currently " +response.body.current.temp + " degree.Feels like "+ response.body.current.feels_like+" degree.Weather is "+response.body.current.weather[0].description



              
          )
              
              
              
      }
  })
}



module.exports = forcaste;