import React from 'react'
import { StyleSheet, View, Button, TextInput, ActivityIndicator} from 'react-native'
import CocktailList from './CocktailList'
import {getCocktailFromApiWithSearchedText} from '../Service/ServiceCocktail'


class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = {
      Cocktails: [],
      isLoading: false
    }

    this._loadCocktails = this._loadCocktails.bind(this)
  }

  _loadCocktails() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
     
      getCocktailFromApiWithSearchedText(this.searchedText).then(data => {
        //console.log(data.drinks);
          this.setState({
            Cocktails: data.drinks,
            isLoading: false
          })
      })
    }
  }
  _displayDetailForCocktail = (id) => {
    this.props.navigation.navigate('CocktailDetails', {id: id})
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
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

  render() {
    //console.log(this.state);
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Nom du cocktail'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadCocktails()}
        />
        <Button title='Rechercher' onPress={() => this._loadCocktails()}/>
        <CocktailList
          Cocktails={this.state.Cocktails} 
          navigation={this.props.navigation} 
          loadCocktails={this._loadCocktails}
          favoriteList={false} 
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search