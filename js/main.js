// league and team IDs can be found in documentation

/* prevent default page reload on click
document.querySelector('input').addEventListener('click', function handleClick(event) {
  event.preventDefault();
}); */

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "0cdf2e99564aaa2ac3de3c12f656fb29");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// insted of user selected from dropdown, we will just load stats on page load

function getFetchTopScorers() {
  let arrOfLeagues = [61, 39, 253] // shortened array of leagues for testing
  // let arrOfLeagues = [2, 39, 253, 78, 61, 140, 71]
  /* 
  Champions league = 2 // champions league has different array position at getstats() it is statistics[1] instead of statistics[0]
  premier league 39
  MLS = 253
  bundesliga = 78
  ligue 1 == 61
  la liga = 140 
  Serie A = 71
  */
  arrOfLeagues.forEach((el, i) => {
    fetch(`https://v3.football.api-sports.io/players/topscorers?season=2022&league=${el}`, requestOptions)
      .then(respons => respons.json())

      // .then(result => console.log(result))
      .then(result => {
        createTable(result.response, arrOfLeagues[i])
        if (i === arrOfLeagues.length - 1) addTitleToTable(arrOfLeagues[i]) // do this function if last table/ arrItem
      })
      .catch(error => console.log('error', error));
  })
}
getFetchTopScorers()

// LEAGUE TITLE FOR EACH TABLE 
//  ----------------------------------------------------------------------------------------------------
function addTitleToTable(leagueId) {

  let tables = document.querySelectorAll('table')
  console.log(tables)
  tables.forEach(table => {
    console.log(table.className)
    let title;
    if (table.className === 'leagueId39') title = 'Premier League'
    if (table.className === 'leagueId61') title = 'Ligue 1'
    if (table.className === 'leagueId253') title = 'MLS'

    addTitle(table.className, title)
  })
  console.log(leagueId)
  function addTitle(tClass, title) {

    let div1 = document.createElement("div");
    div1.style.fontSize = '30px'
    div1.style.color = 'rgb(58, 85, 88)'
    div1.innerText = title
    // Get the reference element
    let div2 = document.querySelector('.' + tClass)
    // Get the parent element
    let parentDiv = document.querySelector('body');
    console.log(parentDiv, div1, div2)
    // Insert the new element into before sp2
    parentDiv.insertBefore(div1, div2);

  }
}
// ---------------------------------------------------------------------------------------
function createTable(result, leagueId) {

  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.className = 'leagueId' + leagueId
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');



  //  ----------------------------------------------------------------------------------------------------
  // STATS HEADING FOR EACH TABLE
  //  ----------------------------------------------------------------------------------------------------
  let arrHeader = ['', '', '', 'Goals', 'On Target', 'Assists']
  var headerRow = document.createElement('tr'); //creates blank row
  for (let i = 0; i < arrHeader.length; i++) {
    var headerEl = document.createElement('td'); //creates element (node?)
    headerEl.appendChild(document.createTextNode(arrHeader[i]))
    headerRow.appendChild(headerEl)  // this actually adds the column
    headerRow.className = 'headingRow'

  }
  tbdy.appendChild(headerRow); // this actually adds the row

  //  ----------------------------------------------------------------------------------------------------

  result.forEach((el, i) => { // for each player
    if (i < 10) { // this is added just for testing so I dont use my API calls , remove the if statement after testing

      let pId = el.player.id
      console.log(pId)

      getStats(pId)

      let pPhoto = el.player.photo
      // console.log(el.player) object
      let pName = el.player.name
      console.log(pName)
      let pNation = el.player.nationality

      addRow([pName, pPhoto, pId])  // pId is pulled in for classname of row
      function addRow(arr) {

        // adding the info (photo and name) into elements in rows
        var tr = document.createElement('tr'); //creates blank row
        tr.className = 'p' + pId

        for (let i = 0; i < arr.length - 1; i++) {
          var td = document.createElement('td'); //creates element (node?)
          if (i === 1) {
            var img = document.createElement('img')
            img.src = arr[i]
            td.className = 'imgTd'
            td.appendChild(img)


          } else {
            td.appendChild(document.createTextNode(arr[i]))
          }
          tr.appendChild(td)  // this actually adds the column
        }


        tbdy.appendChild(tr); // this actually adds the row
      }
    }
  })

  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
function addStatsToRows(stats, pId) {
  console.log(stats, pId)
  console.log(stats.goals.total)
  // need to create an array of stats that will be added to row
  let arrStats = [stats.team.logo, stats.goals.total, stats.shots.on, stats.goals.assists]
  console.log(arrStats)
  let rowsClass = '.p' + pId
  // adding stats into elements in rows
  var row = document.querySelector(rowsClass); //creates blank row
  console.log(row)

  for (let i = 0; i < arrStats.length; i++) {
    let td = document.createElement('td'); //creates element (node?)
    if (i === 0) {
      let img = document.createElement('img')
      img.src = arrStats[i]
      td.className = 'logoTd'
      td.appendChild(img)


    } else {
      td.appendChild(document.createTextNode(arrStats[i]))
    }
    row.appendChild(td)  // this actually adds the column
  }

}

function getStats(pId) {
  // player stats in documentation is Players > Players
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




/* class MakeNewPlayerStats {
  constructor(goals, assists) {
    this.goals = goals
    this.assists = assists
  }
}
 */








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


// CREATE TABLE WITH TABLE DATA AS PPARAMETERS  --  example
function tableCreate(photo, pName, pId, pNation) {
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');

  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');

  for (var i = 0; i < 20; i++) {
    var tr = document.createElement('tr');

    // use this to create headings on first row - needs work
    for (var j = 0; j < 10; j++) {
      if (i == 0 && j == 0) {
        tr.style.height = '50px'
        break;

        // this adds each column
      } else {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('-'))
        // i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;

        //  this actually adds the column
        tr.appendChild(td)
      }
    }
    tbdy.appendChild(tr); // this actually adds the row
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
// tableCreate();

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