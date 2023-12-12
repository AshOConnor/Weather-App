const express = require("express");
const fetch = require("node-fetch");
const app = express();

const apiKey = process.env.API_KEY;

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
