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
for (let i = 0; i < pokemonList.length; i++) {
    /*assigning varibles for current Pokemon's name and height*/
    let name = pokemonList[i].name;
    let height = pokemonList[i].height;

    /*Writing name and height to document*/
    document.write(name + " " + height);

    /*Testing if height is over 1m*/
    if (height > 1) {
        document.write(" - Wow, that's big!");
    }
    document.write("<br>");
}s