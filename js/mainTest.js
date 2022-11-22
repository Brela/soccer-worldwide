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
  let arrOfLeagues = [2, 39]
  // let arrOfLeagues = [2, 39, 253, 78, 61, 140, 71]

  /* 
  Champions league = 2
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
  console.log(result)
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');

  result.forEach((el, i) => {
    if (i === 0) { // this is added just for testing so I dont use my API calls
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

        let stats = getStats(pId)


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
    .then(result => addRow(result.response))
    .catch(error => console.log('error', error));
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