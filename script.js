const pokeContainer = document.querySelector('#poke-container');
const pokemonCount = 150;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#F4E7DA',
  rock: '#D5D5D4',
  fairy: '#FCEAFF',
  poison: '#98D7A5',
  bug: '#F8D5A3',
  dragon: '#97B3E6',
  psychic: '#EAEDA1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const mainTypes = Object.keys(colors);

console.log(mainTypes);

const createPokemonCard = (pokemon) => {
  const pokemonEL = document.createElement('div');
  pokemonEL.classList.add('pokemon');

  const id = pokemon.id.toString().padStart(3, '0');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);

  const color = colors[type];

  pokemonEL.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="img-container">
    <img
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
          pokemon.id >= 100 ? '' : 0
        }${pokemon.id <= 9 ? 0 : ''}${pokemon.id}.png"
        alt=""
    />
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
  </div>
  `;

  pokemonEL.innerHTML = pokemonInnerHTML;

  pokeContainer.appendChild(pokemonEL);
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const fetchPokemon = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

fetchPokemon();
