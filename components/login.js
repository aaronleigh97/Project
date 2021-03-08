import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '' ,
        };
    }

    login = async () => 
    {
        const request = 
        {
            email: this.state.email,
            password: this.state.password
        };
        
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then(async (response) => {
            await AsyncStorage.setItem('@token', response.token);
            await AsyncStorage.setItem('@user_id', response.id.toString());
            this.props.navigation.navigate('Home');
            console.log(response);
        })
        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        })
    }

    render () {

        const navigation = this.props.navigation;

        return (
            <View style={ styles.container}>    
                <TextInput
            placeholder="Email"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            />
            <TextInput
            placeholder="Password"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.login()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
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


export default Login;