// league and team IDs can be found in documentation - https://www.api-football.com/documentation-v3#tag/Players/operation/get-players

async function getTopScorers(leagueId) {
  const response = await fetch(`http://localhost:7077/topScorers/${leagueId}`);
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    console.error("Failed to fetch top scorers:", await response.text());
    return null;
  }
}

// ---------------------------------------------------------------------------------------
function createTable(topScorers, leagueId) {
  // Create table element and set its class and border attribute
  const tbl = document.createElement("table");
  tbl.className = "leagueId" + leagueId;
  tbl.setAttribute("border", "1");

  // Create table body element
  const tbdy = document.createElement("tbody");

  // Create table header row
  const headerRow = document.createElement("tr");
  headerRow.className = "headingRow";

  // Create header cells containing the column headings and add them to the header row
  const headerCells = ["", "", "", "Goals", "On Target", "Assists"];
  headerCells.forEach((headerCell) => {
    const td = document.createElement("td");
    td.textContent = headerCell;
    headerRow.appendChild(td);
  });
  tbdy.appendChild(headerRow);

  // Function to add a row to the table (Moved out of the forEach loop)
  function addRow(arr, pId) {
    const tr = document.createElement("tr");
    tr.classList.add("row", "row2", "row3", "p" + pId);

    for (let i = 0; i < arr.length - 1; i++) {
      const td = document.createElement("td");
      if (i === 1) {
        const img = document.createElement("img");
        img.src = arr[i];
        td.className = "imgTd";
        td.appendChild(img);
      } else {
        td.appendChild(document.createTextNode(arr[i]));
      }
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }

  // Iterate through each player
  topScorers.forEach((el, i) => {
    if (i < 10) {
      const pId = el.player.id;
      console.log(pId);
      getStats(pId);

      const pPhoto = el.player.photo;
      const pName = el.player.name;

      addRow([pName, pPhoto, pId], pId);
    }
  });

  // Append the table body element to the table element
  tbl.appendChild(tbdy);

  // Get the correct div element based on leagueId and append the table element to it
  let divId;
  if (leagueId === 39) divId = "divPremierLeague";
  if (leagueId === 61) divId = "divLigue1";
  if (leagueId === 253) divId = "divMls";

  const div = document.getElementById(divId);
  div.appendChild(tbl);

  // turn off spinner since data is in
  const spinner = div.querySelector(".spinner");
  if (spinner) {
    console.log(spinner);
    spinner.style.display = "none";
  } else {
    console.error("Spinner element not found");
  }
}

async function createTables() {
  document
    .querySelectorAll(".spinner")
    .forEach((spinner) => (spinner.style.display = "block"));

  const arrOfLeagues = [39, 61, 253];
  // const arrOfLeagues = [39];
  for (const id of arrOfLeagues) {
    try {
      const topScorers = await getTopScorers(id);
      createTable(topScorers, id);

      // Delay betwen requests to fix cors error
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(error);
    }
  }
}

createTables();

// GET STATS FOR EACH PLAYER AND ADD TO ROW THAT IS ALREADY CREATED
//  ----------------------------------------------------------------------------------------------------

async function getStats(pId) {
  const response = await fetch(`http://localhost:7077/playerStats/${pId}`);
  if (response.ok) {
    const result = await response.json();
    let stats = result[0]?.statistics[0] || null;
    addStatsToRows(stats, pId);
  } else {
    // If an error occurs (like CORS), pass null stats to add empty cells.
    addStatsToRows(null, pId);
  }
}

// by this point, a table is created with each player's name and image
// now, we add the team logo and stats
function addStatsToRows(stats, pId) {
  let rowsClass = ".p" + pId;
  let row = document.querySelector(rowsClass);

  // Adding Team Logo
  let tdLogo = document.createElement("td");
  if (stats && stats.team && stats.team.logo) {
    let img = document.createElement("img");
    img.src = stats.team.logo;
    tdLogo.className = "logoTd";
    tdLogo.appendChild(img);
  }
  row.appendChild(tdLogo);

  // Adding Goals
  let tdGoals = document.createElement("td");
  tdGoals.appendChild(document.createTextNode(stats?.goals?.total || " "));
  row.appendChild(tdGoals);

  // Adding Shots on Target
  let tdShots = document.createElement("td");
  tdShots.appendChild(document.createTextNode(stats?.shots?.on || " "));
  row.appendChild(tdShots);

  // Adding Assists
  let tdAssists = document.createElement("td");
  tdAssists.appendChild(document.createTextNode(stats?.goals?.assists || " "));
  row.appendChild(tdAssists);
}
