import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AddReview extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            overall_rating: '',
            price_rating: '',
            quality_rating: '',
            clenliness_rating: '',
            review_body: ''
        };
    }

    addReview = async () =>
    {
        const tryParseInt = (num) => {
            if (isNaN(num)) { return 0; }
            return parseInt(num);
        }
        const navigation = this.props.navigation;
        const locationId = this.props.route.params.location_id;
        const request = 
        {
            overall_rating: tryParseInt(this.state.overall_rating),
            price_rating: tryParseInt(this.state.price_rating),
            quality_rating: tryParseInt(this.state.quality_rating),
            clenliness_rating: tryParseInt(this.state.clenliness_rating),
            review_body: this.state.review_body
        };
        let token = await AsyncStorage.getItem('@token');  
        
        return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(request)
        })
        .then(() => {
            Alert.alert("Review created!");
            navigation.goBack();
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
            keyboardType="numeric"
            placeholder="Overall rating"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            onChangeText={(overall_rating) => this.setState({overall_rating})}
            value={this.state.overall_rating}
            />
            <TextInput
            keyboardType="numeric"
            placeholder="Price rating"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            onChangeText={(price_rating) => this.setState({price_rating})}
            value={this.state.price_rating}
            />
            <TextInput
            keyboardType="numeric"
            placeholder="Quality rating"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            onChangeText={(quality_rating) => this.setState({quality_rating})}
            value={this.state.quality_rating}
            />
            <TextInput
            keyboardType="numeric"
            placeholder="Clenliness rating"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            style={styles.input}
            onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
            value={this.state.clenliness_rating}
            />
            <TextInput
            placeholder="Review body"
            placeholderTextColor="#rgba(255,255,255,0.7)"
            numberOfLines = {5}
            style={styles.input}
            onChangeText={(review_body) => this.setState({review_body})}
            value={this.state.review_body}
            />
            <TouchableOpacity style={ styles.buttonContainer} onPress={() => this.addReview() }>
                <Text style={styles.buttonText}>Add review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>
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
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 7,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF'
    }
    
});

export default AddReview;