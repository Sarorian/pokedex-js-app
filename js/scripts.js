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
        let row = document.querySelector(".row");
        let divCol = document.createElement("div");
        divCol.classList.add("col-md-6", "col-lg-4", "col-xl-3");
        listItem.classList.add('list-group-item');
        let button = document.createElement("button");
        button.classList.add('btn', 'btn-primary');
        button.dataset.toggle = "modal";
        button.dataset.target = "#exampleModal";
        button.innerText = properCase(pokemon.name);
        // button.classList.add("pokemon-button");
        row.append(divCol);
        listItem.append(button);
        divCol.append(listItem);
        button.addEventListener('click', function () {
            showDeatils(pokemon);
        });
    }

    function showModal(pokemon) {

        let modalTitle = document.querySelector('#exampleModalLabel');
        modalTitle.innerHTML = properCase(pokemon.name);
        
        let modal = document.querySelector('#modalBody'); 
        modal.innerHTML = "";

        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", pokemon.imageUrl);

        let pokemonHeightDiv = document.createElement('div');
        let pokemonHeightText = document.createElement("span");
        let pokemonHeight = document.createElement("span");
        pokemonHeightText.innerHTML = "Height of: ";
        pokemonHeight.innerHTML = pokemon.height;
        
 

        modal.appendChild(imageElement);
        modal.appendChild(pokemonHeightDiv);
        pokemonHeightDiv.appendChild(pokemonHeightText);
        pokemonHeightDiv.appendChild(pokemonHeight);

        modal.classList.add('is-visible');
    
      
      }

      function hideModal() {
        let modalContainer = document.querySelector('#exampleModal');
        modalContainer.classList.remove('is-visible');
        let modalTitle = document.querySelector('#exampleModalLabel');
        modalTitle.innerHTML = '';
        let modal = document.querySelector('#modalBody');
        modal.innerHTML = '';
      }

    function properCase(string) {
        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
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
        let modalContainer = document.querySelector('#exampleModal');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });

    let search = document.querySelector('#Search');
    search.addEventListener('keyup', (e) => {
        const regexp = new RegExp(`^${search.value}`,'i')
        $(".pokemon-list").children("div").children("div").children("li").each(function() {
            $(this).addClass("hide");
            if (regexp.test($(this).find("button").html())) {
                $(this).removeClass("hide");
            }  
        })
    })

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

