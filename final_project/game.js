
document.addEventListener("DOMContentLoaded", function(){
    const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

    const game = document.querySelector("#pokeGame")

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
            return `
            <div class="card">
                <div class="front">
                </div>
                <h2> ${pokemon.name}
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

    async function restartGame() {
        const pokemon = await loadPokemon();
        displayPokemon([... pokemon, ... pokemon]);//spreading the elements of the pokemon array twice using the spread (...) operator to duplicate the array.
    }
    restartGame();

    //current year for footer
    const year = new Date().getFullYear();
    document.querySelector("#year").textContent = year;
})

