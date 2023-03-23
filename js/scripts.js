let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    function getAll() {
        return pokemonList;
    }
    
    function add(pokemon) {
        pokemonList.push(pokemon);
    }  

    function addListItem(pokemon) {
        let list = document.querySelector("ul");

        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.classList.add("col-md-6");

        let button = document.createElement("button");
        button.classList.add("btn-block");
        button.classList.add("btn-primary");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');

        button.innerText = pokemon.name;

        listItem.appendChild(button);
        list.appendChild(listItem);

        // button.addEventListener('click', function () {
        //     showDeatils(pokemon);
        // });
    }

    function showModal(pokemon) {
       let modalBody = $(".modal-body");
       let modalTitle = $(".modal-title");

       modalBody.empty();
       modalTitle.empty();

       let pkmName = $("<h1>" + pokemon.name + "</h1>");
       let pkmImage = $('<img class="modal-img" style="width:50%">');
       pkmImage.attr("src", pokemon.imageUrl);
       let pkmHeight = $("<p>" + "Height : " + pokemon.height + "</p>");
       
       modalTitle.append(pkmName);
       modalBody.append(pkmImage);
       modalBody.append(pkmHeight);
      }

      function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }

    function showDeatils(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDeatils: showDeatils,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});