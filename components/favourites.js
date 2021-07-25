import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

class Favourites extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: {}
        };
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
            return json;
        })

        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        })

    }
    
    async componentDidMount() {
        this.setState({user: await this.getUser()})
        this.focusListener = this.props.navigation.addListener('focus', async () => {
            this.setState({user: await this.getUser()})
          });
    }

    render () {

        const navigation = this.props.navigation;
        const sortedLocations = this.state.user.favourite_locations?.sort(function(a, b) {
            var locationA = a.location_name.toUpperCase();
            var locationB = b.location_name.toUpperCase();
            return (locationA < locationB) ? -1 : (locationA > locationB) ? 1 : 0;
        });
         return (
             
                <View style={styles.container}> 
                <FlatList style={styles.container} data={sortedLocations} renderItem={({item}) => 
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text style={styles.title}>
                            {item.location_name}
                        </Text>
                        <Text style={styles.text}>
                            {item.location_town}{"\n"}Average Overall Rating: {item.avg_overall_rating}
                        </Text>
                        <Icon 
                            name={this.state.user.favourite_locations?.filter(location => location.location_id == item.location_id).length > 0 ? 'heart' : `heart-o`} 
                            type='font-awesome' 
                            color='white'
                            style={styles.icon}/>
                    </View>
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
    title: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
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
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 50,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    button1: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'flex-start'
    },
    row: {
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    icon: {
        paddingTop: 15,
        justifyContent: 'flex-end'
    }
})

export default Favourites;