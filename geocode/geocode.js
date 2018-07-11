const request = require('request');

var geocodeAddress = (address, callback) => {
    var addressEncoded = encodeURIComponent(address);

request({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressEncoded,
    json: true 
}, (error, response, body) => {
//    console.log(JSON.stringify(body, undefined, 2));  pretty printing using json.stringify()
    if(error) {
        callback('Unable to connect to Google servers');
    }   else if(body.status === 'ZERO_RESULTS') {
        callback('Address cannot be found.');
    }   else if(body.status === 'OK') {
        callback(undefined, {
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
        });
        
    }
});

};



//we can use status to determine whether address is correct or not if it exists status is okay
//fce03a86d9f409b4cd1c099a8e2a9107
module.exports.geocodeAddress= geocodeAddress;