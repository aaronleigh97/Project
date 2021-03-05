import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import LoginForm from './loginform';

class Login extends Component {

    render () {

        const navigation = this.props.navigation;

        return (
            <View style={ styles.container}> 
                <View style={ styles.formContainer}> 
                 <LoginForm />
             </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#3498db'
    }
});


export default Login;