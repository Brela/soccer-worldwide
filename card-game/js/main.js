//Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', draw2)

let deckID = ''



fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) // parse response as JSON
    .then(data => { //data is just the I gave it - parameter
        console.log(data)
        deckID = data.deck_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


document.querySelector('button').addEventListener('click', draw2)

function draw2() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => { //data is just the I gave it - parameter
            console.log(data)
            document.querySelector('#player1').src = data.cards[0].image
            document.querySelector('#player2').src = data.cards[1].image
            let player1Val = convertToNum(data.cards[0].value)
            let player2Val = convertToNum(data.cards[1].value)
            if (player1Val > player2Val) {
                document.querySelector('.result').innerText = 'Player 1 Wins'
            } else if (player1Val < player2Val) {
                document.querySelector('.result').innerText = 'Player 2 Wins'
            } else {
                document.querySelector('.result').innerText = 'Time For War'
            }
        })

        .catch(err => {
            console.log(`error ${err}`)
        });
}

function convertToNum(val) {
    if (val === 'ACE') {
        return 14
    } else if (val === 'KING') {
        return 13

    } else if (val === 'QUEEN') {
        return 12
    }
    else if (val === 'JACK') {
        return 11
    } else {
        return Number(val)
    }
}