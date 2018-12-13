// Part1

// http://numbersapi.com/random/year?json
// ⇒ {
//     "text": "2012 is the year that the century's second and last solar transit of Venus occurs on June 6.",
//     "found": true,
//     "number": 2012,
//     "type": "year",
//     "date": "June 6"
// }

//callbacks
const baseURL = 'http://numbersapi.com';
let favNumber = Math.floor(Math.random() * 200);

//get the facts for the favNumsList
let favNumList = [7, 12, 15, 28, 27];
$.getJSON(`${baseURL}/${favNumList}`, function(data) {
  console.log(data);
});

// get 4 facts on your favorite number
let facts = [];
$.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
  facts.push(data.text);
  $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
    facts.push(data.text);
    $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
      facts.push(data.text);
      $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
        facts.push(data.text);
        facts.forEach(fact => {
          console.log(fact);
        });
      });
    });
  });
});

//Promise
// Promise.all(
//   Array.from({ length: 4 }, () => {
//     return $.getJSON(`${baseURL}/${favNumber}?json`);
//   })
// ).then(facts => {
//   facts.forEach(data => $('#facts').append(`<p>${data.text}</p>`));
// });

// Async
async function numbers() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => $('#facts').append(`<p>${data.text}</p>`));
}
numbers();
// DECK OF CARDS REQUEST:

// callback

let deckBaseURL = 'https://deckofcardsapi.com/api/deck';
// $.getJSON(`${deckBaseURL}/new/draw/`, function(data) {
//   let firstCard = data.cards[0];
//   let deckId = data.deck_id;
//   $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
//     let secondCard = data.cards[0];
//     [firstCard, secondCard].forEach(function(card) {
//       console.log(`${card.value.toLowerCase()} of ${card.suite.toLowerCase()}`);
//     });
//   });
// });
// let deckId = null;
// let $btn = $('button');
// let $cardArea = $('#card-area');

// $.getJSON(`${deckBaseURL}/new/shuffle/`, function(data) {
//   deckId = data.deck_id;
//   $btn.show();
// });

// $btn.on('click', function() {
//   $.getJSON(`${deckBaseURL}/${deckId}/draw/`).then(data => {
//     let cardSrc = data.cards[0].image;
//     let angle = Math.random() * 90 - 45;
//     let randomX = Math.random() * 40 - 20;
//     let randomY = Math.random() * 40 - 20;
//     $cardArea.append(
//       $('<img>', {
//         src: cardSrc,
//         css: {
//           transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
//         }
//       })
//     );
//     if (data.remaining === 0) $btn.remove();
//   });
// });

//async
async function setup() {
  let $btn = $('button');
  let $cardArea = $('#card-area');

  let deckData = await $.getJSON(`${deckBaseURL}/new/shuffle/`);
  $btn.show().on('click', async function() {
    let cardData = await $.getJSON(`${deckBaseURL}/${deckData.deck_id}/draw/`);
    let cardSrc = cardData.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $('<img>', {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      })
    );
    if (cardData.remaining === 0) $btn.remove();
  });
}
setup();

// // shuffle cards -> returns a deck ID... helper function
// $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//   .then(function(response) {
//     let deckID = response.deck_id;
//     return $.getJSON(
//       `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`
//     );
//   })
//   .then(function(randomCard) {
//     return (deck = randomCard.cards);
//   });

// let zIdx = 1;
// let rotationDeg = 0;

// $('#button').on('click', function() {
//   let newCardImage = deck[0].image;
//   console.log(newCardImage);
//   $('#card').append(
//     `<div class="card d-inline-flex" style="width: 125px; position: absolute; 18rem; z-index: ${zIdx}; left:125px;
//         top:125px; transform: rotate(${rotationDeg}deg)">
//         <img class="card-img-top" src="${newCardImage}" alt="Card image cap">
//       </div>`
//   );
//   deck.shift();
//   zIdx++;
//   rotationDeg += 10;
// });
