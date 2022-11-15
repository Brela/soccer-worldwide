

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

// USER SELECTS LAGUE FROM DROPDOWN
document.querySelector('.submit').addEventListener('click', function () {
  var selectedLeague = ''
  var e = document.getElementById('league');
  selectedLeague = e.options[e.selectedIndex].text;
  getFetchTopScorers(selectedLeague)
})

function getFetchTopScorers(selectedLeague) {
  // learn switch and case
  let pluginLeague = 39

  fetch(`https://v3.football.api-sports.io/players/topscorers?season=2022&league=${pluginLeague}`, requestOptions)
    .then(respons => respons.json())
    .then(result => createTable(result.response, pluginLeague))
    .catch(error => console.log('error', error));

}

function createTable(result, pluginLeague) {
  console.log(result.length)
  var pluginLeague = pluginLeague
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  // tbl.style.width = '50%';
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');


  result.forEach((el, i) => {
    // tr.style.height = '50px'
    let pPhoto = el.player.photo
    console.log(el.player) // object


    let pName = el.player.name
    console.log(pName)
    let pId = el.player.id
    console.log(pId)
    let pNation = el.player.nationality

    addRow([pPhoto, pName, pId, pNation])

    function addRow(arr) {
      let pId = arr.splice(2, 1)
      console.log(pId)





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

      getStats(pId)

      //  this actually adds the column
      tbdy.appendChild(tr); // this actually adds the row
    }
  })

  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}

// need to get player stats
function getStats(pId) {

  fetch(`https://v3.football.api-sports.io/players?id=${pId}&season=2022`, requestOptions)
    .then(respons => respons.json())
    .then(result => {
      console.log(result.response[0].statistics[0])
      // last 10 showing up undefined at .statistics

      // currently here

    })
    .catch(error => console.log('error', error))
}

// premier league ID = 39



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

// GET LEAGUE ID

// then carry over selected league and results
/* function getLeagueID(selected, results) {
  let data = results
  let arr = data.response
  console.log(data)
  console.log('array' + arr)
  let selectedLeague = selected
  console.log('selected' + selectedLeague)
  for (let i = 0; i < arr.length; i++) {
    // arr[i].country.name.includes('England') &&
    if (arr[i].league.name === selectedLeague)
      var pLeague = arr[i].league.id
    // console.table(arr[i].league.id, arr[i].league.name)
  }
  console.log(pLeague)
} */

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