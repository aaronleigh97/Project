import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Locations extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            locations: []
        };
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
    
    async componentDidMount() {
        this.setState({locations: await this.getLocations()})

    }

    render () {

        const navigation = this.props.navigation;
        

         return (
             
                <View style={ styles.container}> 
                <FlatList data={this.state.locations} renderItem={({item}) => <View><Text style={styles.item}>
                {item.location_name}{"\n"}{item.location_town}{"\n"}Average Overall Rating: {item.avg_overall_rating} Average Price Rating: {item.avg_price_rating} </Text>
                <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Reviews',{location_id: item.location_id})}>
                        <Text style={styles.text}>
                            View
                        </Text> 
                        </TouchableOpacity>
                </View>} 
                keyExtractor={(item, index) => index.toString()} 
                showsVerticalScrollIndicator={true}
                />
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
        backgroundColor: '#3498db'
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    button: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'flex-start'
    },
    button: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'flex-start'
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 50,
        marginVertical: 10,
        marginHorizontal: 10,
        fontSize: 20,
        color: 'white'
    },
    button1: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'flex-start'
    }

})

export default Locations;