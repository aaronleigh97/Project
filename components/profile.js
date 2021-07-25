import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

class Profile extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };
        this.getUser();
    }

    updateUser = async () =>
    {
        const request = 
        {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };
        console.log(request);
        let userId = await AsyncStorage.getItem('@user_id');
        let token = await AsyncStorage.getItem('@token');

            fetch(`http://10.0.2.2:3333/api/1.0.0/user/${userId}`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token 
            },
            body: JSON.stringify(request)
        })
        .then(response => Alert.alert("User Updated"))
        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        })
    }

    getUser = async () => 
    {
        let userId = await AsyncStorage.getItem('@user_id');
        let token = await AsyncStorage.getItem('@token');  
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + userId, {
            method: 'GET',
            headers: {
                'X-Authorization': token  
            }
            
        }).then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.setState({first_name: json.first_name})
            this.setState({last_name: json.last_name})
            this.setState({email: json.email})
            return json;
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
                    placeholder="First Name"
                    placeholderTextColor="#rgba(255,255,255,0.7)"
                    style={styles.input}
                    value={this.state.first_name}
                    onChangeText={(first_name) => this.setState({first_name})}
                    />
                    <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#rgba(255,255,255,0.7)"
                    style={styles.input}
                    value={this.state.last_name}
                    onChangeText={(last_name) => this.setState({last_name})}
                    />
                    <TextInput
                    placeholder="Email"
                    placeholderTextColor="#rgba(255,255,255,0.7)"
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput
                    placeholder="Password"
                    placeholderTextColor="#rgba(255,255,255,0.7)"
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    />
                 <TouchableOpacity style={styles.button} onPress={() => this.updateUser()}>
                        <Text style={styles.text}>
                            Save
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.text}>
                            Go Back
                        </Text> 
                    </TouchableOpacity>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        padding: 15
    },
    text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 7,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    button: {
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'center'

    }
})

export default Profile; 