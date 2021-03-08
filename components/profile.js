import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';

class Profile extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: ''
        };
        this.getUser();
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
                    style={styles.input}
                    value={this.state.first_name}
                    />
                    <TextInput
                    style={styles.input}
                    value={this.state.last_name}
                    />
                    <TextInput
                    style={styles.input}
                    value={this.state.email}
                    />
                    <Button
                    title = "Go back"
                    onPress={() => navigation.goBack()}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db'
    },
    text: {
    color: 'white',
    fontSize: 25
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 7,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Profile; 