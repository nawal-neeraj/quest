import { Button, Container, Left, Icon, Right, Body, Title, Input, Card, CardItem, Content } from 'native-base';
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Dimensions, StyleSheet, ScrollView, Image, BackHandler,PermissionsAndroid } from 'react-native'
import { WebView } from 'react-native-webview';
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter';
import { SliderBox } from "react-native-image-slider-box";
import { AppTheme } from '../themes/AppTheme';
import auth from '@react-native-firebase/auth';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
const win = Dimensions.get('window');



export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: [
                require('../Assets/food.jpg'),
                require('../Assets/store.png'),
                "https://source.unsplash.com/1024x768/?tree",
            ]
        };

        
    }

    

    componentDidMount() {
       this.setGeoLocation()
    }

    

    setGeoLocation = async() => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted == PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(info => {
                console.log(info.coords.latitude,"lang info")
                this.updateLocation(info.coords.latitude, info.coords.longitude)
            }, (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
              }, 
              { enableHighAccuracy: true, interval:1000 });
           
          }else{
              console.log("permission denied")
          }
    }
    
    
    updateLocation = (lat, long) =>{
        // console.log(lat,"<=latitude and longitude =>", long)
        const data = firestore().collection('Users')
        .add({
            'info.address.location':new firestore.GeoPoint(lat, long),
        })
        
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <Container>
                <AppHeader>
                    <Left>
                        <Button onPress={() => navigate('Profile')} transparent>
                            <Icon style={{ fontSize: 26 }} name="account-circle" type="MaterialCommunityIcons" />
                        </Button>
                    </Left>
                    <Input style={{ backgroundColor: '#fff', borderRadius: 20, height: 40, marginTop: '2%' }} placeholder="Search" />
                    <Right>
                        <Button transparent>
                            <Icon name="help-circle-outline" type="MaterialCommunityIcons" />
                        </Button>
                    </Right>
                </AppHeader>
                <Content>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={{ height: 200 }}>
                            <SliderBox
                                style={{ width: win.width * 0.95, height: 200, borderRadius: 15, }}
                                sliderBoxHeight={200}
                                resizeMethod={'resize'}
                                resizeMode={'stretch'}
                                images={this.state.image}
                                resizeMethod={'resize'}
                                resizeMode={'stretch'}
                                loop
                                autoplay
                                dotColor='transparent'
                                inactiveDotColor='transparent'
                            />
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <View style={styles.Box}>
                                <View >
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Prepaid recharges</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="cellphone" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Mobile recharge</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="usb-flash-drive-outline" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Data card</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="television-classic" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>DTH</Text>
                                            </View>
                                        </View>
                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="currency-inr" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Add money</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* </CardItem>
                            </Card> */}
                            </View>
                        </View>
                        {/* -------banner section=------ */}

                        <View style={{ marginTop: 5 }}>
                            <View style={styles.scrollBox}>
                                <ScrollView
                                    style={{ padding: 2 }}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <TouchableOpacity>
                                        <Image style={{ height: win.height * 0.14, width: 200, borderRadius: 5, marginRight: 5 }} source={require('../Assets/food.jpg')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={{ height: win.height * 0.14, width: 200, borderRadius: 5, marginRight: 5 }} source={require('../Assets/food.jpg')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={{ height: win.height * 0.14, width: 200, borderRadius: 5, marginRight: 5 }} source={require('../Assets/food.jpg')} />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                        {/* ----------------Recharge and pay bills--------------- */}
                    </View>
                </Content>
                <AppFooter tab={1} {...this.props} />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    Box: {
        backgroundColor: '#FFF',
        padding: 5,
        marginBottom: 10,
        elevation: 1,
        shadowColor: '#0B0B0B',
        shadowOpacity: 1,
        elevation: 10,
        borderRadius: 10,
    },

    scrollBox: {
        backgroundColor: '#FFF',
        marginBottom: 10,
        elevation: 1,
        shadowColor: '#0B0B0B',
        shadowOpacity: 1,
        elevation: 10,
        borderRadius: 5,
        padding: 5

    },
})
