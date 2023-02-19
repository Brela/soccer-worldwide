import API_KEY from './apikey'

// league and team IDs can be found in documentation - https://www.api-football.com/documentation-v3#tag/Players/operation/get-players
// Set up the headers for the API request
var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", API_KEY);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// insted of user selected from dropdown, we will just load stats on page load
/* 
Champions league = 2 // champions league has different array position at getstats() it is statistics[1] instead of statistics[0]
premier league 39 | MLS = 253 | bundesliga = 78 | ligue 1 == 61 | la liga = 140 | Serie A = 71
let arrOfLeagues = [39, 61, 253, 2, 78, 140, 71];
*/

// An async function to get the top scorers data for a given league
async function getTopScorers(leagueId) {
  const response = await fetch(`https://v3.football.api-sports.io/players/topscorers?season=2022&league=${leagueId}`, requestOptions);
  const result = await response.json();
  return result.response;
}
// An async function to get the top scorers data for multiple leagues and create tables for each
async function createTables() {
  const arrOfLeagues = [39, 61, 253]; // shortened array of leagues for testing

  for (const id of arrOfLeagues) {
    try {
      const topScorers = await getTopScorers(id);
      createTable(topScorers, id);
      // Call this addTitle  function once after all data is in to add the title to the top of the table
      if (id === arrOfLeagues[arrOfLeagues.length - 1]) addTitleToTable(id);
    } catch (error) {
      console.error(error);
    }
  }
}

createTables();


// ---------------------------------------------------------------------------------------
function createTable(topScorers, leagueId) {
  // Create table element and set its class and border attribute
  const tbl = document.createElement('table');
  tbl.className = 'leagueId' + leagueId
  tbl.setAttribute('border', '1');

  // Create table body element
  const tbdy = document.createElement('tbody');

  // Create table header row
  var headerRow = document.createElement('tr'); //creates blank row
  headerRow.className = 'headingRow'

  // Create header cells containing the column headings and add them to the header row
  let headerCells = ['', '', '', 'Goals', 'On Target', 'Assists']
  headerCells.forEach((headerCell) => {
    const td = document.createElement('td');
    td.textContent = headerCell;
    headerRow.appendChild(td);
  });
  // Add the header row to the table body
  tbdy.appendChild(headerRow);

  //  ----------------------------------------------------------------------------------------------------
  // Iterate through each player
  // 'topScorers' comes from parameter on createTable function that awaits data from the API
  topScorers.forEach((el, i) => {
    // the number below determines how many top players will be shown for each league - the max is 20
    if (i < 10) {
      // Get player ID, photo, and name
      let pId = el.player.id
      console.log(pId)
      getStats(pId)

      let pPhoto = el.player.photo
      let pName = el.player.name

      // pId is pulled in for classname of row
      addRow([pName, pPhoto, pId])
      // Function to add a row to the table
      function addRow(arr) {
        // Create table row element and set its class name
        const tr = document.createElement('tr');
        tr.className = 'p' + pId

        for (let i = 0; i < arr.length - 1; i++) {
          const td = document.createElement('td');
          if (i === 1) {
            // If current element is the photo, create an image element and set its source
            var img = document.createElement('img')
            // pPhoto is a link to the image given by the API
            img.src = arr[i]
            //image is given a className so that the size can be adjusted in CSS file
            td.className = 'imgTd'
            td.appendChild(img)


          } else {
            // if the element is not the image...
            td.appendChild(document.createTextNode(arr[i]))
          }
          // Append the table cell element to the table row element
          tr.appendChild(td)
        }

        // Append the table row element to the table body element
        tbdy.appendChild(tr); // this actually adds the row
      }
    }
  })
  // Append the table body element to the table element
  tbl.appendChild(tbdy);

  // Get the body element and append the table element to it
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(tbl)
}

// GET STATS FOR EACH PLAYER AND ADD TO ROW THAT IS ALREADY CREATED
//  ----------------------------------------------------------------------------------------------------
function getStats(pId) {
  // player stats in documentation is Players -> Players
  fetch(`https://v3.football.api-sports.io/players?id=${pId}&season=2022`, requestOptions)
    .then(respons => respons.json())

    // .then(result => console.log(result))
    .then(result => {
      /*    let name = result.response[0].player
         console.log(name) */
      // champions league has different array position. at statistics[1] instead of statistics[0]
      let stats = result.response[0].statistics[0] //stats

      addStatsToRows(stats, pId)

    })
    .catch(error => console.log('error', error));
}

// by this point, a table is created with each player's name and image
// now, we add the team logo and stats
function addStatsToRows(stats, pId) {

  // additional stats can be added to this array -> to see available stats, console.log(stats)
  let playerStats = [stats.team.logo, stats.goals.total, stats.shots.on, stats.goals.assists]

  // Finds row for player based on pId in class name
  let rowsClass = '.p' + pId
  let row = document.querySelector(rowsClass);

  // Iterate through each stat in playerStats add them to that row
  for (let i = 0; i < playerStats.length; i++) {
    let td = document.createElement('td');
    if (i === 0) {
      // if i === 0, the element is the team logo, so create an img element and add it's value (a url) to the src
      let img = document.createElement('img')
      img.src = playerStats[i]
      td.className = 'logoTd'
      td.appendChild(img)

    } else {
      // this runs for every element after the team logo image
      td.appendChild(document.createTextNode(playerStats[i]))
    }

    row.appendChild(td)
  }

}

// LEAGUE TITLE FOR EACH TABLE 
//  ----------------------------------------------------------------------------------------------------
function addTitleToTable() {
  // Get all tables on the page
  const tables = document.querySelectorAll('table');

  // Add a league title to each table based on its class name
  tables.forEach(table => {
    const tClass = table.className;
    let title;
    if (tClass === 'leagueId39') title = 'Premier League';
    if (tClass === 'leagueId61') title = 'Ligue 1';
    if (tClass === 'leagueId253') title = 'MLS';

    // Create the title element and add it to the page
    const div1 = document.createElement('div');
    div1.style.fontSize = '30px';
    div1.style.marginLeft = '100px'
    div1.style.color = 'rgb(58, 85, 88)';
    div1.style.paddingTop = '20px';

    div1.innerText = title;
    // Get the reference element
    const div2 = document.querySelector('.' + tClass);
    // Get the parent element
    const parentDiv = document.querySelector('body');
    // Insert the new element before the reference element
    parentDiv.insertBefore(div1, div2);
  });
}



// TEMPLATE

/* function getFetch() {
  const choice = document.querySelector('input').value
  const url = 'https://pokeapi.co/api/v2/pokemon/' + choice

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}  */

// add a rowspan --
// i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;


// this can be used to select a specific node
/* myBody = document.getElementsByTagName("body")[0];
myTable = myBody.getElementsByTagName("table")[0];
myTableBody = myTable.getElementsByTagName("tbody")[0];
myRow = myTableBody.getElementsByTagName("tr")[1];
myCell = myRow.getElementsByTagName("td")[1];

// first item element of the childNodes list of myCell
myCellText = myCell.childNodes[0];

// content of currentText is the data content of myCellText
currentText = document.createTextNode(myCellText.data);
myBody.appendChild(currentText); */