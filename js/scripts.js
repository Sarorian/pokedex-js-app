// let pokemonList = [];
// pokemonList[0] = {
//     name: "Bulbasaur", 
//     height: 0.7, 
//     types: ["grass", "poison"]
// };
// pokemonList[1] = {
//     name: "Ivysaur", 
//     height: 1, 
//     types: ["grass", "poison"]
// };
// pokemonList[2] = {
//     name: "Venusaur", 
//     height: 2, 
//     types: ["grass", "poison"]
// };

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

    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + " " + pokemon.height);
    if (pokemon.height > 1) {
         document.write(" - Wow, that's big!");
    }
    document.write("<br>");
});
