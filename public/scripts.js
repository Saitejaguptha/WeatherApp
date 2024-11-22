const form = document.querySelector(".weatherform");

const senddetails = (e) => {
  e.preventDefault();

  const address = document.getElementById("place");

  fetch("/weather", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ address: address.value }),
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("Weather-Info").innerText = "";
      document.getElementById("Weather-Info").innerText = data;
    })
    .catch((error) => console.error("Error:", error));
};

form.addEventListener("submit", senddetails);
