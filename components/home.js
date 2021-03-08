import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            locations: []
        };
    }

    logout = async () => 
    {
        fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json', 
                'X-Authorization': await AsyncStorage.getItem('@token')  
            }
        
        })

        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    
     }

    getLocations = async () => 
    {
        let token = await AsyncStorage.getItem('@token');  
        return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
            method: 'GET',
            headers: {
                'X-Authorization': token  
            }
            
        }).then((response) => response.json())
        .then((json) => {
            console.log(json);
            return json;

        })

        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        })
    }
 
    render () {

        const navigation = this.props.navigation;
        this.state.locations = this.getLocations();

         return (
                <View style={ styles.container}> 
                    <Button
                    title = "Reviews"
                    onPress={() => navigation.navigate('Reviews')}
                    /> 
                    <Button
                    title = "Profile"
                    onPress={() => navigation.navigate('Profile')}
                    />  
                     <Button
                    title = "Logout"
                    onPress={() => this.logout()}
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