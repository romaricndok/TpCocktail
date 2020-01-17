
// Store/Reducers/favoriteReducer.js

const initialState = { favoritesCocktail: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteCocktailIndex = state.favoritesCocktail.findIndex(item => item.idDrink === action.value.idDrink)
      if (favoriteCocktailIndex !== -1) {
        // Le cocktail est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesCocktail: state.favoritesCocktail.filter( (item, index) => index !== favoriteCocktailIndex)
        }
      }
      else {
        // Le cocktail n'est pas dans les cocktails favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesCocktail: [...state.favoritesCocktail, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite