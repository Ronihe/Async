// Part3
let pBaseURL = 'https://pokeapi.co/api/v2';

function genRandomNum(length) {
  return Math.floor(Math.random() * length);
}
let flavorList = [];

$('#pokemon_btn').on('click', function() {
  async function getThreePokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let allPokemon = await $.getJSON(url);

    let pokemonArr = allPokemon.results;
    let numOne = genRandomNum(949);
    let numTwo = genRandomNum(949);
    let numThree = genRandomNum(949);

    let pokemonOneUrl = pokemonArr[numOne].url;
    let pokemonTwoUrl = pokemonArr[numTwo].url;
    let pokemonThreeUrl = pokemonArr[numThree].url;
    // console.log(pokemonOneUrl, pokemonTwoUrl, pokemonThreeUrl);
    //
    let speciesUrl = await getSpeciesUrl(
      pokemonOneUrl,
      pokemonTwoUrl,
      pokemonThreeUrl
    );

    getFlavorText(speciesUrl);
    console.log(flavorList);
    for (let j of flavorList) {
      $('#pokemon').append(
        `<div class="card d-inline-flex" style="width: 125px; position: absolute; 18rem; left:125px;  
          top:125px;">
          <p>${j.name} </p>
          <p>${j.flavor_text} </p>
        </div>`
      );
    }
  }
}

async function getSpeciesUrl(url1, url2, url3) {
    let pokemonSpecies = await Promise.all([
        $.getJSON(url1),
        $.getJSON(url2),
        $.getJSON(url3)
    ]);
    let newPokemonSpecies = [];
    for (let i of pokemonSpecies) {
        newPokemonSpecies.push(i.species.url);
    }
    //console.log(newPokemonSpecies);
    // return newPokemonSpecies;
    return newPokemonSpecies;
}


async function getFlavorText(speciesUrlArr) {
  // console.log(speciesUrlArr);
  try {
    let flavorTextUrl = await Promise.all([
      $.getJSON(speciesUrlArr[0]),
      $.getJSON(speciesUrlArr[1]),
      $.getJSON(speciesUrlArr[2])
    ]);

    for (let i of flavorTextUrl) {
      // console.log(i);

      flavorList.push({
        name: i.name,
        flavor_text: i.flavor_text_entries[1].flavor_text
      });
    }
    // return flavorList;
    // console.log(flavorList);
  } catch (e) {
    console.log('flaor is not exiting!');
  }
  // let flavorList = flavorTextUrl.flavor_text_entries;
}

getThreePokemons();