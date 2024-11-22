const request = require("postman-request");

const APIKEY = "f33964b1e77141f88dcad32e8a52ea76"; // opencagedata.com API key
let lat, lng;

// Following  Function Returns the lat and long of the address passed by
const Getcoordinates = async (address) => {
  //Returing a new Proisme to send lat and lng to the server
  return new Promise((reslove, reject) => {
    const URL = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${APIKEY}`;

    // Fetching the deatils from API
    request({ url: URL, json: true }, (error, response, body) => {
      if (error) {
        console.log("Unable to Fetch the Details From the API: " + error);
        reject({ lat: 0, long: 0 });
      }

      if (response && response.statusCode !== 200) {
        console.log(
          "Failed to get the deatils from the API: " + response.statusCode
        );
        reject({ lat: 0, long: 0 });
      }

      if (body) {
        lat = body.results[0].geometry.lat;
        lng = body.results[0].geometry.lng;

        reslove({ lat, lng });
      } else {
        console.log(
          "Does Not the Have the coordinates For the Given location " + address
        );
        reject({ lat: 0, long: 0 });
      }
    });
  });
};

module.exports = { Getcoordinates };
