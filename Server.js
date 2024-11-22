const express = require("express");
const details = require("./Details/Weather.js");

const app = express();
// const address = "Hyderabad";

app.use(express.json());
// We use the below line for inserting HTML,CSS content to the server
app.use(express.static("public"));

const PORT = 7654;

const startServer = async (address) => {
  try {
    const Finalmessage = await details.GetWeatherReport(address);

    if (Finalmessage) return Finalmessage;
    else return "Unable to process the data";
  } catch (error) {
    console.error("Error: ", error);
    throw new Error("Failed to Fetch the Weather Info");
  }
};

app.post("/weather", async (req, res) => {
  let address = req.body.address;

  if (!address) res.status(404).send("Bad Request");
  try {
    let msg = await startServer(address);
    res.send(`${msg.message}`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () =>
  console.log("Server running on port: " + PORT + " sucessfully")
);
