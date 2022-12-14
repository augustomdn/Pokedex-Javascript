const pokemonList = document.getElementById('pokemonsList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 20;
let offset = 0;



function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</span>
                
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type[0].toUpperCase() + type.substring(1)}`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml
        })
}

loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})