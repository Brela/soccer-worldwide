

//prevent default page reload on click
document.querySelector('input').addEventListener('click', function handleClick(event) {
  event.preventDefault();
});



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

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "0cdf2e99564aaa2ac3de3c12f656fb29");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// user selects league
document.querySelector('.submit').addEventListener('click', function () {
  var selectedLeague = ''
  var e = document.getElementById('league');
  selectedLeague = e.options[e.selectedIndex].text;
  getFetch(selectedLeague)
})
// pull in API data and carry over selectedLeague
function getFetch(selectedLeag) {
  let selectedLeague = selectedLeag
  fetch("https://v3.football.api-sports.io/leagues", requestOptions)
    .then(response => response.json())
    .then(results => getLeagueID(results, selectedLeague))
    .catch(error => console.log('error', error));
}



function getLeagueID(results, selected) {
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
}
function getFetchTopScorers() {
  fetch("https://v3.football.api-sports.io/players/topscorers?season=2022&league=39", requestOptions)
    .then(respons => respons.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

/* function topScorers(result) {
  let topScorersData = result
  console.log(`topScorers: ${topScorersData}`)
} */

// premier league ID = 39

