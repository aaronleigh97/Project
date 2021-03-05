import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home';
import Contact from './components/contact';
import About from './components/about';
import Login from './components/login';

const Stack = createStackNavigator()

class App extends Component {
  render () {
    return (
      <NavigationContainer>

        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>

      </NavigationContainer>
    )
  }
}

export default App;