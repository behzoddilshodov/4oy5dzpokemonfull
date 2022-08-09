



let elWrapper = document.querySelector(".movie__wrapper");
let elForm = document.querySelector(".search__form");
let elInputHeight = document.querySelector(".form__height");
let elInputWeight = document.querySelector(".form__weight");
let elInputType= document.querySelector(".form__type");
let elInputSort = document.querySelector("#inputGroupSelect01");
let elRenderResult = document.querySelector("#results");
let elPokemonTemplate = document.querySelector("#movie_card").content;
let elInputName = document.querySelector(".name");
let elInputSpawnTime = document.querySelector(".form__spawn-time");


let pokemonArray = pokemons.slice(0, 150);
// console.log(pokemonArray);

//gey types
function getType(array) {
  let newArray = []
  array.forEach(item => {
    let type = item.type;
    
    type.forEach(item1 => {
      if (!newArray.includes(item1)) {
        newArray.push(item1)
      }
    });
  })
  return newArray
  
};

getType(pokemonArray)
let types = (getType(pokemonArray));


//render types
function getTypes(array, wrapper) {
  let fragment = document.createDocumentFragment();

  for (const item of array) {
    let newOption = document.createElement("option");
    newOption.textContent = item;
    newOption.value = item;
    fragment.appendChild(newOption);
  }
  wrapper.appendChild(fragment)
}

getTypes(types, elInputType)


//render pokemon
function renderPokemon(array, wrapper) {
  wrapper.innerHTML = null;
  elRenderResult.textContent = array.length

  let fragment = document.createDocumentFragment();

  for (const item of array) {


    let pokemonTemplate = elPokemonTemplate.cloneNode(true);
    pokemonTemplate.querySelector(".movie__img").src = item.img;
    pokemonTemplate.querySelector(".movie__title").textContent = item.name;
    pokemonTemplate.querySelector(".pokemon__height").textContent = item.height;
    pokemonTemplate.querySelector(".pokemon__weight").textContent = item.weight;
    pokemonTemplate.querySelector(".pokemon__type").textContent = item.type;
  
    

    fragment.appendChild(pokemonTemplate);
  }

  wrapper.appendChild(fragment)
}

renderPokemon(pokemonArray, elWrapper)


elForm.addEventListener("submit", function (evt) {
  evt.preventDefault()

  let inputHeight = elInputHeight.value.trim();
  let inputWeight = elInputWeight.value.trim();
  let inputSort = elInputSort.value.trim();
  let inputType = elInputType.value.trim();
  let inputName = elInputName.value.trim();
  // le

  

  let filteredArray = pokemonArray.filter(function (item) {
    let isTrue = inputType == "all" ? true: item.type.includes(inputType);
    let validation = Number(item.height.split(" ")[0]) >= inputHeight && Number(item.weight.split(" ")[0]) >= inputWeight && isTrue ;
    return validation;
  })

  if (inputSort == "weighthighlow") {
    filteredArray.sort((a, b) => {
      return Number(b.weight.split(" ")[0]) - Number(a.weight.split(" ")[0])
    }
    )}
  
    if (inputSort == "weightlowtohigh") {
      filteredArray.sort((a, b) => {
        return Number(a.weight.split(" ")[0]) - Number(b.weight.split(" ")[0])
      }
      )}
    
      if (inputSort == "heighthighlow") {
        filteredArray.sort((a, b) => {
          return Number(b.height.split(" ")[0]) - Number(a.height.split(" ")[0])
        }
        )}

        if (inputSort == "heightlowhigh") {
          filteredArray.sort((a, b) => {
            return Number(a.height.split(" ")[0]) - Number(b.height.split(" ")[0])
          }
          )}


  
  renderPokemon(filteredArray, elWrapper)

 

   
  })
  











