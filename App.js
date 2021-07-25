import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home';
import Profile from './components/profile';
import Locations from './components/locations';
import Login from './components/login';
import Register from './components/register';
import Reviews from './components/reviews';

const Stack = createStackNavigator()

class App extends Component {

  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} /> 
          <Stack.Screen name="Register" component={Register} />    
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Locations" component={Locations} />
          <Stack.Screen name="Profile" component={Profile} /> 
          <Stack.Screen name="Reviews" component={Reviews} /> 
        </Stack.Navigator>
      </NavigationContainer>     
    )
  }
}

export default App;