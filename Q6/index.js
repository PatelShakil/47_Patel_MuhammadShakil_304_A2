const express = require("express");
const request = require("request");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.get("/api/joke", (req, res) => {
  const options = {
    url: "https://v2.jokeapi.dev/joke/Any", // Updated joke API URL
    headers: {
      Accept: "application/json",
    },
    json: true, // Automatically parses the JSON response
  };

  request.get(options, (error, response, body) => {
    if (error) {
      console.error("Request failed:", error);
      return res.status(500).json({ error: "Failed to fetch joke" });
    }

    // Handle both single and two-part jokes
    let jokeText = "";
    if (body.type === "single") {
      jokeText = body.joke;
    } else if (body.type === "twopart") {
      jokeText = `${body.setup} ... ${body.delivery}`;
    }

    res.json({ joke: jokeText });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
