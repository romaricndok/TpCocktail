import React, {Component} from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import Search from '../Components/Search'
import CocktailDetails from '../Components/CocktailDetails'
import Favorites from '../Components/Favorites'
import AddCocktail from '../Components/AddCocktail';

const SearchStackNavigator = createStackNavigator({
    Search : {
        screen: Search,
        navigationOptions: {
            title :"Rechercher"
        }
    },
    CocktailDetails: {
        screen: CocktailDetails
    }
})

const FavoriteStackNavigator = createStackNavigator({
    Search : {
        screen: Favorites,
        navigationOptions: {
            title :"Mes favoris"
        }
    },
    CocktailDetails: {
        screen: CocktailDetails
    }
})

const AddStackNavigator = createStackNavigator({
    Search : {
        screen: AddCocktail,
        navigationOptions: {
            title :"Ajouter un cocktail"
        }
    },
    CocktailDetails: {
        screen: CocktailDetails
    }
})


    const MoviesTbaNavigator =createBottomTabNavigator({
        Search: {
            screen: SearchStackNavigator,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (
                    <Icon color={tintColor} size={25} name={'ios-search'} />
                )
            }
        },
        Favorites: {
            screen: FavoriteStackNavigator,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (
                    <Icon color={tintColor} size={25} name={'ios-heart'} />
                )
            }
        },
        AddCocktail: {
            screen: AddStackNavigator,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (
                    <Icon color={tintColor} size={35} name={'ios-add'} />
                )
            }
        }
    }, 
    
    {
        tabBarOptions:{
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF'
        }
    })
    


export default createAppContainer(MoviesTbaNavigator)