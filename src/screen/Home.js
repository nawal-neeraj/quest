import { Button, Container, Left, Icon, Right, Body, Title, Input, Card, CardItem, Content } from 'native-base';
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Dimensions, StyleSheet, ScrollView, Image, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview';
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter';
import { SliderBox } from "react-native-image-slider-box";
import { AppTheme } from '../themes/AppTheme';
import auth from '@react-native-firebase/auth';
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
        // this.biometriCheck();
    }

    

    componentDidMount() {
        // this.subscribe = auth().onAuthStateChanged(user => {
        //     if (!user) {
        //         console.log("hello")
        //     }
        //     console.log(user,"details")
        // });
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
                        {/* <WebView source={{uri:'https://www.firstpay.org.in/'}}/> */}
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

                        {/*----- another section -----  */}

                        {/*------- prepaid recharge section------- */}

                        <View style={{ paddingTop: 20 }}>
                            <View style={styles.Box}>
                                {/* <Card style={{ borderRadius: 20 }}>
                                <CardItem > */}
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

                        <View style={{ paddingTop: 10 }}>
                            <View style={styles.Box}>
                                {/* <Card style={{ borderRadius: 20 }}>
                                <CardItem > */}
                                <View >
                                    <View style={{ padding: 5 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Recharge & Pay Bills</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="cellphone" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Mobile Pay</Text>
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
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="lightbulb-on-outline" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Electricity</Text>
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="bottle-tonic-outline" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Gas Nationwide</Text>
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="bank-transfer" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Money Transfer</Text>
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="water-outline" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Water Bill Payment</Text>
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingTop: 10, width: '25%' }}>
                                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 50 }}>
                                                <Icon style={{ color: AppTheme.PRIMARY }} name="phone-classic" type='MaterialCommunityIcons' />
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={{ textAlign: 'center' }}>Landline</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* </CardItem>
                            </Card> */}
                            </View>
                        </View>
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
