import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import FadeIn from '../Animations/FadeIn'
//import displayDetailForFilm from  './FilmDetails'

class CocktailItem extends React.Component {

  _displayFavoriteImage() {
    if(this.props.isCocktailFavorite){
      return (
          <Image 
              source = {require('../Images/ic_favorite.png')}
              style={styles.favorite_image}
          />
      )
    }
}

    render() {
        //console.log(this.props); //afficher l'objet
        const {cocktail, displayDetailForCocktail }= this.props
        return (
          <FadeIn>
            <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForCocktail(cocktail.idDrink)}>
                <Image 
                    style={styles.image}
                    source={{uri: cocktail.strDrinkThumb}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.title_text}>{cocktail.strDrink}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={5}>{cocktail.strInstructions}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>modifié le {cocktail.dateModified}</Text>
                    </View>
                </View>
            </TouchableOpacity>
          </FadeIn>
        )
    }
}
const styles = StyleSheet.create({
    main_container: {
      height: 190,
      flexDirection: 'row'
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 1,
      flexDirection: 'row'
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 17,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    vote_text: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#666666'
    },
    description_container: {
      flex: 4
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666'
    },
    date_container: {
      flex: 1
    },
    date_text: {
      textAlign: 'right',
      fontSize: 14
    },
    favorite_image: {
      height:20,
      width:20,
      marginRight:5
    }
  })
export default CocktailItem
