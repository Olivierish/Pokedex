function toggleClassName(){
    const sidebarElt = document.querySelector(".sidebar");
    const openElt = document.getElementById('open');
    const closeElt = document.getElementById('close');

    sidebarElt.classList.toggle('active');

    if(sidebarElt.classList.contains('active')){
        openElt.style.display = "none";
        closeElt.style.display = "block";
    }
    else{
        openElt.style.display = "block";
        closeElt.style.display = "none";
    }
}

let allPokemon = [];
let finalTable = [];
const inputElt = document.getElementById('search-poke');

function fetchPokemonDB(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(responseApi =>responseApi.json())
    .then((allPoke)=>{
        allPoke.results.forEach(pokemon => {
            fetchPokemon(pokemon);
        });        
    });
}

fetchPokemonDB();

function fetchPokemon(pokemon) {
    let objPokemonFull = {};
    let url = pokemon.url;
    let namePoke = pokemon.name;

    fetch(url)
    .then(responseApi => responseApi.json())
    .then((pokeData) => {
        // objPokemonFull.pic = pokeData.sprites.front_default;
        objPokemonFull.pic = pokeData.sprites.front_shiny;
        objPokemonFull.type = pokeData.types[0].type.name;
        objPokemonFull.name = namePoke;

        allPokemon.push(objPokemonFull);

        if (allPokemon.length === 151) {
            console.log(allPokemon);
        }

    });
}

//Animation input
inputElt.addEventListener('input',(e)=>{
    if (e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }
});

