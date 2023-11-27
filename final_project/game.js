
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const game = document.getElementById('game');

async function loadPokemon() {
    const randomIds = new Set();
    while(randomIds.size < 8) {
        const randomNum = Math.ceil(Math.random()* 200);
        randomIds.add(randomNum)
    }
    console.log([...randomIds]);
    const randomIdsArray = [...randomIds]
    for (let i = 0; i < randomIdsArray.length; i++) {
        const data = await fetch(pokeAPI + randomIdsArray[i])
        const pokemon = await data.json();
        console.log(pokemon);
    }   
}
loadPokemon();




//Year for footer
document.addEventListener("DOMContentLoaded", function(){
    const year = new Date().getFullYear();
    document.querySelector("#year").textContent = year;
})

