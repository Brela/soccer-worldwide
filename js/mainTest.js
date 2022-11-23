// league and team IDs can be found in documentation

//prevent default page reload on click
document.querySelector('input').addEventListener('click', function handleClick(event) {
  event.preventDefault();
});

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
  let arrOfLeagues = [61] // shortened array of leagues for testing
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
  arrOfLeagues.forEach(el => {
    fetch(`https://v3.football.api-sports.io/players/topscorers?season=2022&league=${el}`, requestOptions)
      .then(respons => respons.json())

      // .then(result => console.log(result))
      .then(result => createTable(result.response))
      .catch(error => console.log('error', error));
  })
}
getFetchTopScorers()


function createTable(result) {

  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');

  result.forEach((el, i) => { // for each player
    if (i === 0) { // this is added just for testing so I dont use my API calls

      let pId = el.player.id
      console.log(pId)

      getStats(pId)

      let pPhoto = el.player.photo
      // console.log(el.player) object
      let pName = el.player.name
      console.log(pName)
      let pNation = el.player.nationality

      // this should call the player stats constructor
      // the player constructor should wait for it's own goals to be difined before returning
      let stats = player()
      waitForStatsBeforeAddingRow()
      function waitForStatsBeforeAddingRow() {
        if (stats) {
          addRow([pPhoto, pName, pNation]) // this adds row once stats are in
        } else {
          setTimeout(waitForStatsBeforeAddingRow, 500)
        }
      }

      function addRow(arr) {

        // adding the info into elements in rows
        var tr = document.createElement('tr'); //creates blank row
        for (let i = 0; i < arr.length; i++) {
          var td = document.createElement('td'); //creates element (node?)
          if (i === 0) {
            var img = document.createElement('img')
            img.src = arr[i]
            td.appendChild(img)


          } else {
            td.appendChild(document.createTextNode(arr[i]))
          }
          tr.appendChild(td)
        }

        //  this actually adds the column
        tbdy.appendChild(tr); // this actually adds the row
      }
    }
  })

  tbl.appendChild(tbdy);
  body.appendChild(tbl)
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
      let s = result.response[0].statistics[0] //stats
      console.log(s)
      console.log(s.goals.total, s.goals.assists)
      player.goals = s.goals.total
    })
    .catch(error => console.log('error', error));
}
function player() {

  if (this.goals) {
    return this.goals
  } else {
    setTimeout(player, 500)
  }
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


// CREATE TABLE WITH TABLE DATA AS PPARAMETERS
function tableCreate(photo, pName, pId, pNation) {
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  // tbl.style.width = '50%';
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