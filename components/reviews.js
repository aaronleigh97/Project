import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Reviews extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            location: {}
        };
    }

    likeLocations = async () =>
    {
        
    }
    
    getLocation = async () => {
        const locationId = this.props.route.params.location_id;
        let token = await AsyncStorage.getItem('@token');
        return fetch(`http://10.0.2.2:3333/api/1.0.0/location/${locationId}`, {
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

    async componentDidMount() {
        this.setState({location: await this.getLocation()})
    }

    render() {
        const navigation = this.props.navigation;

        return(
            <View style={styles.container}> 
                <Text style={styles.title}>
                    {this.state.location.location_name}
                </Text>
                <Text style={styles.subTitle}>
                    Description
                </Text>
                <Text style={styles.text}>
                   Town: {this.state.location.location_town}
                </Text>
                <Text style={styles.text}>
                   Price Rating: {this.state.location.avg_price_rating}
                </Text>
                <Text style={styles.text}>
                   Clenliness Rating: {this.state.location.avg_clenliness_rating}
                </Text>
                <Text style={styles.text}>
                    Overall Rating: {this.state.location.avg_overall_rating} 
                </Text>
                <Text style={styles.subTitle}>
                    Reviews
                </Text>
                <FlatList data={this.state.location.location_reviews} renderItem={({item}) => 
                <View>
                    <Text style={styles.item}>
                        {item.review_body}
                    </Text>
                </View>} 
                keyExtractor={(item, index) => index.toString()} 
                showsVerticalScrollIndicator={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Locations')}>
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
        backgroundColor: '#3498db'
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    title: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 50,
        marginVertical: 10,
        marginHorizontal: 10,
        fontSize: 20,
        color: 'white'
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

export default Reviews;