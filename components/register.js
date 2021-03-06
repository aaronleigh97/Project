import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

class Register extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '' ,
            firstName: '',
            lastName: ''      
        };
    }

    register()
    {
        const request = 
        {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        
        return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            Alert.alert("User created! " + response.id);
        })
        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        })
    }
    render () {

        return (
            <View style={ styles.container}> 
            <TextInput
            placeholder="First name"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
            />
            <TextInput
            placeholder="Last name"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
            />
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
            <TouchableOpacity style={ styles.buttonContainer} onPress={() => this.register()}>
                <Text style={styles.buttonText}>Create</Text>
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

export default Register;