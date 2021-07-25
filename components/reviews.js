import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

class Reviews extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            location: {},
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

    favouriteUnfavouriteLocation = async () =>
    {
        let locationFavourited = this.state.user.favourite_locations?.filter(location => location.location_id == this.state.location.location_id).length > 0;
        let token = await AsyncStorage.getItem('@token');  
        await fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.state.location.location_id}/favourite`, {
            method: locationFavourited ? 'delete' : 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        })
        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        });
        this.setState({user: await this.getUser()});
    }

    likeUnlikeReview = async (review_id) =>
    {
        let reviewLiked = this.state.user.liked_reviews?.filter(likedReview => likedReview.review.review_id == review_id).length > 0;
        let token = await AsyncStorage.getItem('@token');  
        await fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.state.location.location_id}/review/${review_id}/like`, {
            method: reviewLiked ? 'delete' : 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            }
        })
        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        });
        this.setState({location: await this.getLocation(), user: await this.getUser()});
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
            return json;
        })

        .catch((error) => {
            Alert.alert("Oops, an error occured");
            console.log(error);
        })
    }

    async componentDidMount() {
        this.setState({location: await this.getLocation(), user: await this.getUser()})
        this.focusListener = this.props.navigation.addListener('focus', async () => {
            this.setState({location: await this.getLocation(), user: await this.getUser()})
          });
    }

    render() {
        console.log(this.state.location);
        const navigation = this.props.navigation;
        return(
            <View style={styles.container}> 
                <Text style={styles.title}>
                    {this.state.location.location_name}
                </Text>
                <Text style={styles.text}>
                    Town: {this.state.location.location_town}{"\n"}
                    Overall Rating: {this.state.location.avg_overall_rating}{"\n"}
                    Price Rating: {this.state.location.avg_price_rating}{"\n"}
                    Quality Rating: {this.state.location.avg_overall_rating}{"\n"}
                    Clenliness Rating: {this.state.location.avg_clenliness_rating}{"\n"}
                </Text>
                <Icon
                name={this.state.user.favourite_locations?.filter(location => location.location_id == this.state.location.location_id).length > 0 ? 'heart' : `heart-o`} 
                type='font-awesome' 
                color='white'
                onPress={() => this.favouriteUnfavouriteLocation()}/>
                <Text style={styles.subTitle}>
                    Reviews
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddReview', {location_id: this.state.location.location_id})}>
                        <Text style={styles.text}>
                            Add review
                        </Text> 
                </TouchableOpacity>
                <FlatList data={this.state.location.location_reviews} renderItem={({item}) => 
                <View style={styles.item}>
                    <Text style={styles.text}>
                        {item.review_body}{"\n"}
                    </Text>
                    <Text style={styles.text}>
                        Likes: {item.likes}
                    </Text>
                    <Icon
                    name={this.state.user.liked_reviews?.filter(likedReview => likedReview.review.review_id == item.review_id).length > 0 ? 'heart' : `heart-o`} 
                    type='font-awesome' 
                    color='white'
                    onPress={() => this.likeUnlikeReview(item.review_id)}/>
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
        backgroundColor: '#3498db',
        padding: 15
    },
    text: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 15
    },
    title: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 30,
        marginVertical: 10,
        fontSize: 20,
        color: 'white'
    },
    button: {
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 15,
        borderRadius: 50,
        textAlign: 'center',
        justifyContent: 'center'
    }
})

export default Reviews;