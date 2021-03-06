import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class Home extends Component {

    render () {

        const navigation = this.props.navigation;

         return (
                <View style={ styles.container}> 
                    <Button
                    title = "About"
                    onPress={() => navigation.navigate('About')}
                    /> 
                    <Button
                    title = "Contact"
                    onPress={() => navigation.navigate('Contact')}
                    /> 
                    <Button
                    title = "Login"
                    onPress={() => navigation.navigate('Login')}
                    /> 
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db'
    },
    text: {
    color: 'white',
    fontSize: 25,
    backgroundColor: '#3498db'
    }
})
export default Home;