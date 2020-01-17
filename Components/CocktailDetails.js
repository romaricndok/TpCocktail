
import React from 'react'
import { StyleSheet,Share, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import { getCocktailDetailFromApi } from '../Service/ServiceCocktail'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'


class CocktailDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cocktail: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    const favoriteCocktailIndex = this.props.favoritesCocktail.findIndex(item => item.idDrink === this.props.navigation.state.params.id)
    if (favoriteCocktailIndex !== -1) { 
      this.setState({
        cocktail: this.props.favoritesCocktail[favoriteCocktailIndex]
      })
      return
    }
    this.setState({ isLoading: true })
    getCocktailDetailFromApi(this.props.navigation.state.params.id).then(data => {
      //console.log('data',data);
      this.setState({
        cocktail: data,
        isLoading: false
      })
    })
  }

  _shareCocktail(){
      const { cocktail } = this.state
      Share.share({title: cocktail.drinks[0].strDrink , message: cocktail.drinks[0].strInstructions})
  }

  _displayFloatingActionButton(){
    const {cocktail} = this.state
    if(cocktail != undefined && Platform.OS === "android"){
      return(
        <TouchableOpacity
          style={styles.share_touchable_floating_action}
          onPress={() => this._shareCocktail()}>
          <Image 
            style={styles.share_image}
            source= {require('../Images/ic_share.png')}
          />
        </TouchableOpacity>
      )
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite(){
      const action = { type: "TOGGLE_FAVORITE", value: this.state.cocktail }
      this.props.dispatch(action)
  }



  _displayFavoriteImage() {
      var sourceImage = require('../Images/ic_favorite_border.png')
      var shouldEnlarge = false
      if(this.props.favoritesCocktail.findIndex(item => item.idDrink === this.state.cocktail.idDrink) !== -1){
        sourceImage = require('../Images/ic_favorite.png')
        shouldEnlarge = true 
      }
      return (
        <EnlargeShrink
          shouldEnlarge={shouldEnlarge}>
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
        </EnlargeShrink>
      )
  }

  _displayCocktail() {
    const { cocktail } = this.state
    //console.log(cocktail);
    if (cocktail != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: cocktail.drinks[0].strDrinkThumb}}
          />
          <Text style={styles.title_text}>{cocktail.drinks[0].strDrink}</Text>
          <TouchableOpacity 
            style={styles.favorite_container}
            onPress = {() => this._toggleFavorite() } >
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{cocktail.drinks[0].strInstructions}</Text>
          <Text style={styles.default_text}>Dernière modification le : {cocktail.drinks[0].dateModified}</Text>
          <Text style={styles.default_text}>Type de boisson : {cocktail.drinks[0].strAlcoholic}</Text>
          <Text style={styles.default_text}>Categorie de cocktail : {cocktail.drinks[0].strCategory}</Text>
          <Text style={styles.default_text}>Forme de cocktail : {cocktail.drinks[0].strGlass}</Text>
          <Text style={styles.default_text}>Ingredients(s) : 
          {cocktail.drinks[0].strIngredient1} /
          {cocktail.drinks[0].strIngredient2} /
          {cocktail.drinks[0].strIngredient3} /
          {cocktail.drinks[0].strIngredient4}.
          </Text>
          <Text style={styles.default_text}>Mesures par Ingredients(s) : 
          {cocktail.drinks[0].strMeasure1} /
          {cocktail.drinks[0].strMeasure2} /
          {cocktail.drinks[0].strMeasure3} /
          {cocktail.drinks[0].strMeasure4}.
          </Text>
        </ScrollView>
      )
    }
  }

  render() {
    console.log(this.props.favoritesCocktail);
    return (
      <View style={styles.main_container}>
        {this._displayCocktail()}
        {this._displayLoading()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  favorite_container: {
      alignItems: 'center'
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floating_action:{
    position:'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#e91e63'
  },
  share_image:{
    width:30,
    height:30
  }
})

const mapStateToProps = (state) => {
    return {
        favoritesCocktail : state.favoritesCocktail
    }
}

export default connect(mapStateToProps)(CocktailDetails)