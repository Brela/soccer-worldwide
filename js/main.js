
// league and team IDs can be found in documentation - https://www.api-football.com/documentation-v3#tag/Players/operation/get-players

const requestOptions = {
    method: 'GET',
    headers: new Headers({
      "x-rapidapi-key": "0cdf2e99564aaa2ac3de3c12f656fb29",
      "x-rapidapi-host": "v3.football.api-sports.io"
    }),
    redirect: 'follow'
  };
  
  async function getTopScorers(leagueId) {
    const response = await fetch(`https://v3.football.api-sports.io/players/topscorers?season=2022&league=${leagueId}`, requestOptions);
    const result = await response.json();
    return result.response;
  }
  
  async function createTables() {
    const arrOfLeagues = [39, 61, 253];  
    // const arrOfLeagues = [39];  
    for (const id of arrOfLeagues) {
      try {
        const topScorers = await getTopScorers(id);
        createTable(topScorers, id);
      } catch (error) {
        console.error(error);
      }
    }
  }



createTables();

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
  if (leagueId === 39) divId = 'divPremierLeague';
  if (leagueId === 61) divId = 'divLigue1';
  if (leagueId === 253) divId = 'divMls';

  const div = document.getElementById(divId);
  div.appendChild(tbl);
}

// GET STATS FOR EACH PLAYER AND ADD TO ROW THAT IS ALREADY CREATED
//  ----------------------------------------------------------------------------------------------------
function getStats(pId) {
  // player stats in documentation is Players -> Players
  fetch(
    `https://v3.football.api-sports.io/players?id=${pId}&season=2022`,
    requestOptions
  )
    .then((respons) => respons.json())

    // .then(result => console.log(result))
    .then((result) => {
      /*    let name = result.response[0].player
         console.log(name) */
      // champions league has different array position. at statistics[1] instead of statistics[0]
      let stats = result.response[0].statistics[0]; //stats

      addStatsToRows(stats, pId);
    })
    .catch((error) => console.log("error", error));
}

// by this point, a table is created with each player's name and image
// now, we add the team logo and stats
function addStatsToRows(stats, pId) {
  // additional stats can be added to this array -> to see available stats, console.log(stats)
  let playerStats = [
    stats?.team?.logo || "",
    stats?.goals?.total || "",
    stats?.shots?.on || "",
    stats?.goals?.assists || "",
  ];

  // Finds row for player based on pId in class name
  let rowsClass = ".p" + pId;
  let row = document.querySelector(rowsClass);

  // Iterate through each stat in playerStats add them to that row
  for (let i = 0; i < playerStats.length; i++) {
    let td = document.createElement("td");
    if (i === 0) {
      // if i === 0, the element is the team logo, so create an img element and add it's value (a url) to the src
      let img = document.createElement("img");
      img.src = playerStats[i];
      td.className = "logoTd";
      td.appendChild(img);
    } else {
      // this runs for every element after the team logo image
      td.appendChild(document.createTextNode(playerStats[i]));
    }

    row.appendChild(td);
  }
}