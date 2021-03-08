import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

class Profile extends Component {

    render () {

        const navigation = this.props.navigation;

         return (
                <View style={ styles.container}> 
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
    }
})

export default Profile; 