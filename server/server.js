import express from "express";
import cors from "cors";

let fetch;

// Dynamic import for node-fetch
import("node-fetch").then((module) => {
  fetch = module.default;
});

const app = express();
const PORT = 7077; // You can choose a different port if you like

// Enable CORS for all routes
app.use(cors());

const API_KEY = "0cdf2e99564aaa2ac3de3c12f656fb29"; // It's safer to use environment variables for API keys

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

/* function getStats(pId) {
    fetch(
      `https://v3.football.api-sports.io/players?id=${pId}&season=2022`,
      requestOptions
    )
      .then((respons) => respons.json())
      .then((result) => {
        let stats = result.response[0].statistics[0];
        addStatsToRows(stats, pId);
      })
      .catch((error) => {
        console.log("error", error);
        // If an error occurs (like CORS), pass null stats to add empty cells.
        addStatsToRows(null, pId);
      });
  } */
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
