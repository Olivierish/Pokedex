//This function open and close the sidebar, 
//when the user click on the burger menu.
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
let allPokemonSorted = [];
const inputElt = document.getElementById('search-poke');
const pokeListElt = document.querySelector('.list-poke');
const loaderElt = document.querySelector('.loader');

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};

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
        objPokemonFull.id = pokeData.id;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePoke}`)
        .then(responseApi => responseApi.json())
        .then((pokeData) =>{
            //console.log(pokeData);
            objPokemonFull.color = pokeData.color.name;
            allPokemon.push(objPokemonFull);
        

        if (allPokemon.length === 151) {
            
            allPokemonSorted = allPokemon.sort((a,b)=>{
                return a.id - b.id;
            }).slice(0,21);

            createCard(allPokemonSorted);
            loaderElt.style.display = "none";
        }
        });

        
    });
}
// Create a card
function createCard(arr) {
    for (let i = 0; i < arr.length; i++) {
        const cardElt = document.createElement('li');
        //cardElt.style.background = arr[i].color;
        cardElt.style.background = types[arr[i].type];
        const cardTextElt = document.createElement('h5');
        cardTextElt.innerText = capitalize(arr[i].name);
        const cardIdElt = document.createElement('p');
        cardIdElt.innerText = displayId(arr[i].id);
        const cardImgElt = document.createElement('img');
        cardImgElt.src = arr[i].pic;

        cardElt.appendChild(cardImgElt);
        cardElt.appendChild(cardTextElt);
        cardElt.appendChild(cardIdElt);
        
        pokeListElt.appendChild(cardElt);
        
    }
}
function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}
function displayId(id) {
    str = id.toString();
    return `No.${str.padStart(3,'0')}`;      
}

// Infinite Scroll

window:addEventListener('scroll',() => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // scrollTop : the scroll size from the top
    // scrollHeight : scroll total(size of the html document)
    // clientHeight : the height of the user's screen 
    
    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }
});

let index = 21;

function addPoke(nbr) {
    if(index > 151){
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nbr);
    createCard(arrToAdd);
    index += nbr;
}

//Search using the button
// const formElt = document.querySelector('form');
//     formElt.addEventListener('submit', (e) => {
//         e.preventDefault();
//         searchPoke();
//     });

//Search on the fly, whenever the user write a letter or delete one.
inputElt.addEventListener('keyup',searchPoke);

function searchPoke() {
    if(index < 151){
        addPoke(130);
    }
    let filter, allLiElts, titleValue, allTitleElts;
    filter = inputElt.value.toUpperCase(); 
    allLiElts = document.querySelectorAll('li');
    allTitleElts = document.querySelectorAll('li > h5');

    for (let i = 0; i < allLiElts.length; i++) {
        titleValue = allLiElts[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1){
            allLiElts[i].style.display = "flex";
        } else {
            allLiElts[i].style.display = "none";
        }
    }
}


//Animation input
inputElt.addEventListener('input',(e)=>{
    if (e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }
});

