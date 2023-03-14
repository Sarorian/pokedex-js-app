let pokemonRepository = (function() {
    let pokemonList = [];
    pokemonList[0] = {
        name: "Bulbasaur", 
        height: 0.7, 
        types: ["grass", "poison"]
    };
    pokemonList[1] = {
        name: "Ivysaur", 
        height: 1, 
        types: ["grass", "poison"]
    };
    pokemonList[2] = {
        name: "Venusaur", 
        height: 2, 
        types: ["grass", "poison"]
    };

    function getAll() {
        return pokemonList;
    }
    
    function add(pokemon) {
        if (typeof(pokemon) === "object"){
            if (Object.keys(pokemon) === ["name", "height", "types"]) {
                pokemonList.push(pokemon);
            } else {
                return "Please give the Pokemon a name, height, and types";
            }
        } else {
            return "Please make the Pokemon an object";
        }
    }  

    function addListItem(pokemon) {
        let list = document.querySelector("ul");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        listItem.append(button);
        list.append(listItem);
        button.addEventListener('click', function () {
            showDeatils(pokemon);
        });
    }

    function showDeatils(pokemon) {
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDeatils: showDeatils
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
