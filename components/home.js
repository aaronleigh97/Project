import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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

    
 
    render () {

        const navigation = this.props.navigation;
        

         return (
                <View style={ styles.container}> 

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Locations')}>
                        <Text style={styles.text}>
                            Locations
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
                        <Text style={styles.text}>
                            Profile
                        </Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.logout('Logout')}>
                        <Text style={styles.text}>
                            Logout
                        </Text> 
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
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center'
    }

})
export default Home;