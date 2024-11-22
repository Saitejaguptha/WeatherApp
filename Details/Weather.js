// Using the following line for getting the deatils form the API
const request = require("postman-request");
const coord = require("./Cordinate.js");

const APIKEY = "a6256182081dec94953c28250b292b0e"; // openweathermap API key
let message;

// Getting the Deatils of the Weather address passed by
const GetWeatherReport = async (address) => {
  const { lat, lng } = await coord.Getcoordinates(address);

  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`;

  return new Promise((resolve, reject) => {
    // with the below we are able to fecth the data from the api using url
    request({ url: URL, json: true }, (error, response, body) => {
      //Cheking For the error and printing the error if occured
      if (error) {
        message = `Unable to process data from the API: ${error}`;
        return reject({ message });
      }

      //Cheking the response from the API and printing if the response does not goes well.
      if (response.statusCode !== 200) {
        message = `Unable to process data from the API: ${response.statusCode}`;
        return reject({ message });
      }

      //Cheking the deatils in the body and printing the details
      if (body) {
        message = `Today in ${address} Temparture ${body.main.temp} but it Feels like ${body.main.feels_like},  Maximun temparture ${body.main.temp_max}, Minimun temparture ${body.main.temp_min}, pressure ${body.main.pressure} and humidity ${body.main.humidity}`;
        return resolve({ message });
      } else {
        message = "There is No Weather Report for the Given location";
        return reject({ message });
      }
    });
  });
};

module.exports = { GetWeatherReport };
