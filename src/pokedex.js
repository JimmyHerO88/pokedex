const spinner = document.querySelector('#spinner');
const poke_container = document.getElementById("poke-container");
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
let offset = 1;
let pokemon_count = 18;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#fae57b',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#c37aff',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#E6E0D4',
    normal: '#F5F5F5'
}

const main_types = Object.keys(colors);

previous.addEventListener('click', () => {
    if(offset != 1){
        offset -= 12;
        removeChildNodes(poke_container);
        fetchPokemons(offset, pokemon_count);
    }
    
});

next.addEventListener('click', () => {
    if(offset != 65){
        offset += 12;
        removeChildNodes(poke_container);
        fetchPokemons(offset, pokemon_count);
    }
    
});

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

const fetchPokemons = async(offset, pokemon_count) => {
    
    spinner.style.display = "block";
    for (let i = offset; i < offset + pokemon_count; i++) {
        await getPokemon(i);        
    }
}

const getPokemon = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const res = await fetch(url);
    const data = await res.json()
    createPokemonCard(data);
    spinner.style.display = "none";
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3,0);
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];
    const abilities =  pokemon.abilities.map(ability => ability.ability.name);
    const weight = pokemon.weight;

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHtml = `<div class="img-container">
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="">
                            </div>
                            <div class="info">
                                <span class="number">#${id}</span>
                                <h3 class="name">${name}</h3>
                                <small class="type">Weight: <span><strong>${weight}</strong></span></small><br>
                                <small class="type">Type: <span><strong>${type}</strong></span></small><br>
                                <small class="type">Abilities:</small><br>                                
                                <small class="type"><span><strong>${abilities}</strong></span></small><br>
                            </div>`; 
    
    pokemonEl.innerHTML = pokemonInnerHtml;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons(offset, pokemon_count);