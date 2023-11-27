
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

const game = document.querySelector("#pokeGame")

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

async function loadPokemon() {
    const randomIds = new Set();
    while(randomIds.size < 8) {
        const randomNum = Math.ceil(Math.random()* 200);
        randomIds.add(randomNum)
    }
    // console.log([...randomIds]);
    const pokePromises = [...randomIds].map(id => fetch(pokeAPI + id));
    const resposes = await Promise.all(pokePromises);
    return await Promise.all(resposes.map(res => res.json()));  
}

function displayPokemon(pokemon) {
    pokemon.sort (() => Math.random() - 0.5); //returns a random number between -0.5 and 0.5 for every "pair of elements" being compared. This results in a random sorting order for the array(instead of just ascending and descending).
    const pokemonHTML = pokemon.map(pokemon => {
        const type = pokemon.types[0]?.type?.name || "normal";
        const color = colors[type]
        return `
        <div class="card" style="background-color:${color}" onclick="rotateCard(event)" data-pokename = "${pokemon.name}">
            <div class="front">
            </div>
            <div class="back rotated" style="background-color:${color}" >
                <img src="${pokemon.sprites.front_default}" alt=${pokemon.name}/>
                <h2>${pokemon.name}</h2>  
            </div>
            
        </div>
        `
    }).join("")
    game.innerHTML = pokemonHTML;
}

// Another way to generatePokemonCard
// function displayPokemon(pokemon) {
//     pokemon.sort(() => Math.random() - 0.5);
//     const pokemonHTML = pokemon.map(generatePokemonCard).join("");
//     game.innerHTML = pokemonHTML;
// }

// function generatePokemonCard(pokemon) {
//     return `
//         <div class="card">
//             <h3>${pokemon.name}</h3>
//         </div>
//     `;
// }

function rotateCard(event) {
    //console.log(event.currentTarget.dataset.pokename)
    const pokemonCard = event.currentTarget;
    const [front, back] = getFrontAndBackFromCard(pokemonCard);
    front.classList.toggle('rotated');
    back.classList.toggle('rotated');

}
function getFrontAndBackFromCard(card){
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    return [front, back]
} 

async function restartGame() {
    const pokemon = await loadPokemon();
    displayPokemon([... pokemon, ... pokemon]);//spreading the elements of the pokemon array twice using the spread (...) operator to duplicate the array.
}
restartGame();

//current year for footer
const year = new Date().getFullYear();
document.querySelector("#year").textContent = year;