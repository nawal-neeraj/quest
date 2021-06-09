import { Body, Button, Container, Content, Header, Icon, Left, Right, Title, Card, CardItem, ListItem } from 'native-base'
import React, { Component } from 'react'
import { Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import { AppTheme } from '../themes/AppTheme'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
import { clearLogin, getLogin } from '../config/AppAuth';
import { AppConfig } from '../config/AppConfig';
import auth, { firebase } from '@react-native-firebase/auth';

const { SlideInMenu } = renderers;

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            userEmail: '',
            UserPhoneNo: '',
            noData: false,
            userId: '',
            userDispName:''
        }
    }

    componentDidMount() {
        this.getUserDetails();

    }

    loginGet = () => {
        getLogin().then(user => {
            // console.log(user, "<====")
            if (user != null) {
                this.setState({
                    userId: user.id
                },
                    () => this.getUserDetails());
            } else {
                this.setState({
                    noData: true
                })
            }
        })
    }

    getUserDetails = () => {
        this.subscribe = auth().onAuthStateChanged(user => {
            console.log(user,"<==Nawal")
            if(user != null){
                this.setState({
                    userId: user._user.uid,
                    userEmail: user._user.email,
                    userDispName: user._user.displayName
                })
            }else{
                this.setState({
                    noData: true
                })
            }
            
        });
    }

    componentWillUnmount(){
        this.subscribe()
    }

    HandleOption = () => {
        this.setState({
            show: !this.state.show
        })
    }

    handleLogOut = () => {
        auth()
  .signOut()
  .then(() => this.props.navigation.navigate('profile'))
    }
    

    render() {
        const { goBack, navigate } = this.props.navigation
        const { userName, UserPhoneNo, noData, userEmail, userDispName } = this.state
        // console.log(userEmail, userDispName,"<==")
        return (
            <Container>
                <Header style={{ backgroundColor: AppTheme.PRIMARY, }} androidStatusBarColor={AppTheme.PRIMARY}>
                    <Left>
                        <Button onPress={goBack} transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => this.HandleOption()} transparent>
                            <Icon name="dots-vertical" type='MaterialCommunityIcons' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={{ paddingTop: 15, paddingLeft: 10, paddingRight: 10 }}>
                        <View style={{ height: 200, borderWidth: 1, borderColor: AppTheme.PRIMARY, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {/* <View style={{ flex: 1, justifyContent: 'center' }}></View> */}
                                <View style={{ flex: 2, justifyContent: 'center', paddingTop: '5%' }}>
                                    <View>
                                        <Image style={{ height: 100, width: 100 }} source={require('../Assets/profilePic.png')} />
                                    </View>
                                    {!this.state.noData && (
                                        <View style={{ paddingLeft: 5 }}>
                                            <View style={{ justifyContent: 'center'}}>
                                                <Text>Name: {userDispName}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'center' }}>
                                                <Text>Email: {userEmail}</Text>
                                            </View>
                                        </View>
                                    )}
                                    {this.state.noData == true && (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ alignItems: 'center', paddingTop: 10 }}>
                                            <Text style={{ color: 'blue', fontWeight: 'bold' }}>Login/Signup</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {/* <View style={{ flex: 0.1, justifyContent: 'center' }}></View> */}
                                <TouchableOpacity
                                    onPress={() => navigate('EditProfile')}
                                    style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>
                                        Edit Profile
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 0.2 }}>
                                    <Icon style={{ color: AppTheme.PRIMARY }} name="shield-check" type="MaterialCommunityIcons" />
                                </View>
                                <View style={{ flex: 1, }}>
                                    <View style={{ height: 30, justifyContent: 'center', backgroundColor: AppTheme.PRIMARY, borderRadius: 5 }}>
                                        <Text style={{ textAlign: 'center', color: '#fff' }}>Lock Your Screen</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}></View>
                            </View>
                        </View>
                        {/*---------------------- card section------------------------- */}
                        <View style={{ paddingTop: 20 }}>
                            {!this.state.noData && (
                            <TouchableOpacity onPress= {() => this.handleLogOut()}>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="card-account-details-outline" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>Logout</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}
