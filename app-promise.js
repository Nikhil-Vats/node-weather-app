
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.option({
    a:{
        demand:true,
        alias:'address',
        describe:'Address to fetch weather',
        string:true     //tells yargs to use "a" as a string
    }
})
.help()
.alias('help','h')
.argv;

var addressEncoded = encodeURIComponent(argv.address);
var geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressEncoded;

axios.get(geocodeURL).then((response)=>{
if(response.data.status === 'ZERO_RESULTS')  {
    throw new Error('Unable to find that address');
}  
var lat = response.data.results[0].geometry.location.lat;
var lng= response.data.results[0].geometry.location.lng;    
var weatherURL = `https://api.darksky.net/forecast/fce03a86d9f409b4cd1c099a8e2a9107/${lat},${lng}` ;
    
 console.log(response.data.results[0].formatted_address);
return axios.get(weatherURL);
}).then((response)=>{
    var temp = response.data.currently.temperature;
    var appTemp = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temp} but it feels like ${appTemp}`);
}).catch((e) => {
        if(e.code === 'ENOTFOUND')
            console.log('Unable to connect to server');
    else {
        console.log(e.message);
    }
});




