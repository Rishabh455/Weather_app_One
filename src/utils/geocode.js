const request = require('postman-request');

const geocoder = (address, callback) => {
 

  const url = `http://api.positionstack.com/v1/forward?access_key=cf89e3379d6bc61506ec202843c750b1&query=`+address;
  request({ url: url, json: true }, (error, response) => {
      if (error) {
          callback("unable to connect to api ......",undefined);
      }
     else  if (response.body.data.length===0||response.body.data.length===undefined) { callback("location not found..",undefined) }
      else if(response.error){callback('location not found try again',undefined)}
      else {
          callback(
              undefined,{
              latitude: response.body.data[0].latitude,
              longitude: response.body.data[0].longitude,
              position: response.body.data[0].label,
               // 'Weather respone of' + response.body.data[0].label
              }
          )
              
              
              
      }
  })
}

module.exports = geocoder