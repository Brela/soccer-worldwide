import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

let fetch;

// Dynamic import for node-fetch
import("node-fetch").then((module) => {
  fetch = module.default;
});

const app = express();
const PORT = 7077;

// Enable CORS for all routes
app.use(cors());

const API_KEY = process.env.API_KEY; 

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const result = await response.json();
  return result.response;
}

const requestOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
  redirect: "follow",
};

app.get("/topScorers/:leagueId", async (req, res) => {
  const { leagueId } = req.params;

  try {
    const data = await fetchData(
      `https://v3.football.api-sports.io/players/topscorers?season=2023&league=${leagueId}`,
      requestOptions
    );
    res.json(data);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/playerStats/:playerId", async (req, res) => {
  const { playerId } = req.params;

  try {
    const data = await fetchData(
      `https://v3.football.api-sports.io/players?id=${playerId}&season=2023`,
      requestOptions
    );
    res.json(data);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
