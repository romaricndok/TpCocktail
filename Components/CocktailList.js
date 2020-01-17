import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import CocktailItem from './CocktailItem'
import { connect } from 'react-redux'

class CocktailList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      Cocktails: []
    }
  }

  _displayDetailForCocktail = (id) => {
    this.props.navigation.navigate('CocktailDetails', {id: id})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.Cocktails}
          extraData={this.props.favoritesCocktail}
          keyExtractor={(item) => item.idDrink.toString()}
          renderItem={({item}) => (
            <CocktailItem
              cocktail={item}
              isCocktailFavorite={(this.props.favoritesCocktail.findIndex(cocktail => cocktail.idDrink === item.idDrink) !== -1) ? true : false}//Bonus pour différencier les films déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForCocktail={this._displayDetailForCocktail}
            />
          )}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesCocktail: state.favoritesCocktail
  }
}

export default connect(mapStateToProps)(CocktailList)