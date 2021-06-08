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

const { SlideInMenu } = renderers;

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            userName: '',
            UserPhoneNo: '',
            noData: false,
            userId:''
        }
    }

    componentDidMount() {
        this.loginGet();
        
    }

    loginGet = () =>{
        getLogin().then(user => {
            // console.log(user, "<====")
            if( user != null){
                this.setState({
                    userId:user.id
                }, 
                () => this.getUserDetails());
            } else{
                this.setState({
                    noData:true
                })
            }
        })
    }

    getUserDetails = () => {
        const {userId} = this.state
        let url = `${AppConfig.API_URL}user_details&id=${userId}`
        fetch(url).then((response) => response.json()).then((res) => {
            console.log(res.data.email_id,"<======user details")
            this.setState({
                userName: res.data.first_name,
                UserPhoneNo:res.data.phone_no,
                userEmail:res.data.email_id
            })
        })
    }

    HandleOption = () => {
        this.setState({
            show: !this.state.show
        })
    }

    handleLogOut = () => {
        const { push } = this.props.navigation
        clearLogin().then(() => {
            push('Login')
            this.setState({
                show: false
            })
        })
    }

    render() {
        const { goBack, navigate } = this.props.navigation
        const { userName, UserPhoneNo, noData, userEmail } = this.state
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
                                <View style={{ flex: 1, justifyContent: 'center' }}></View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: '5%' }}>
                                    <View>
                                        <Image style={{ height: 100, width: 100 }} source={require('../Assets/profilePic.png')} />
                                    </View>
                                    {!this.state.noData && (
                                        <View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                                <Text>{UserPhoneNo}</Text>
                                            </View>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                                <Text>{userName}</Text>
                                            </View>
                                        </View>
                                     )}
                                    {this.state.noData == true && (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ alignItems: 'center', paddingTop:10 }}>
                                            <Text style={{ color: 'blue', fontWeight:'bold'}}>Login/Signup</Text>
                                        </TouchableOpacity>
                                     )} 
                                </View>
                                <View style={{ flex: 0.1, justifyContent: 'center' }}></View>
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
                            <View>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="card-account-details-outline" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>BHIM UPI ID</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="lock-outline" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>Change Password</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="qrcode-scan" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>QR Code</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="note-text-outline" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>Bill Charges</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="alpha-l-box-outline" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>Language</Text>
                                        </Body>
                                        <Right>
                                            <Text style={{ color: 'blue', justifyContent: 'center' }}>Change</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="map-marker-outline" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>My Address</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ paddingTop: 10 }}>
                                <Card style={{ padding: 10, borderRadius: 10 }}>
                                    <CardItem>
                                        <View style={{ padding: 5 }}>
                                            <Icon name="clipboard-list-outline" type="MaterialCommunityIcons" />
                                        </View>
                                        <Body style={{ padding: 5, paddingLeft: 10, justifyContent: 'center' }}>
                                            <Text>Privacy Policies</Text>
                                        </Body>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </CardItem>
                                </Card>
                            </View>
                            <View style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <View >
                                        <Text style={{ color: 'blue' }}>
                                            KYC Details
                                    </Text>
                                    </View>
                                    <View style={{ paddingTop: 10 }}>
                                        <Text style={{ color: '#75777C' }}>
                                            Complete Your KYC Details
                                    </Text>
                                    </View>
                                </View>
                                <View style={{ paddingTop: '5%' }}>
                                    <Text style={{ color: AppTheme.PRIMARY }}>Check</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}
