import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

class LoginForm extends Component {

    render () {

        return (
            <View style={ styles.container}> 
            <TextInput
            placeholder="Username or Email"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            />
            <TextInput
            placeholder="Password"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            />
            <TouchableOpacity style={ styles.buttonContainer}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        padding: 10,
        justifyContent: 'center'
    },
    
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 7,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF'
    }
});


export default LoginForm;