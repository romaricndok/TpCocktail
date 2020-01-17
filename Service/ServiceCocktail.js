
export function getCocktailFromApiWithSearchedText (text) {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + text
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}

export function getCocktailDetailFromApi (id){
    const url='https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id 
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}