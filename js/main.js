

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
    .then(result => createTable(result.response))
    .catch(error => console.log('error', error));

}
function createTable(result) {
  result.forEach(el => {
    console.log(el.player.photo)
    let photo = el.player.photo
    console.log(el.player) // object


    console.log(el.player.name)
    let pName = el.player.name
    console.log(el.player.id)
    let pId = el.player.id
    console.log(el.player.nationality)
    let pNation = el.player.nationality

  })


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
tableCreate();