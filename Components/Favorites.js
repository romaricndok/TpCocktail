// Components/Favorites.js

import React from 'react'
import { StyleSheet } from 'react-native'
import CocktailList from './CocktailList'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  render() {
    return (
      <CocktailList
        Cocktails={this.props.favoritesCocktail}
        navigation={this.props.navigation}
        favoriteList={true} // Ici on est bien dans le cas de la liste des cocktails favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de cocktails après un scroll lorsqu'on est sur la vue Favoris.
      />
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = state => {
  return {
    favoritesCocktail: state.favoritesCocktail
  }
}

export default connect(mapStateToProps)(Favorites)