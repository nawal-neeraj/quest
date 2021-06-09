import React, { Component } from 'react'
import { Button, Container, Left, Icon, Header, Text, Toast, List, ListItem } from 'native-base';
import { TextInput, TouchableOpacity, View, Dimensions, StyleSheet, ScrollView, Image, BackHandler } from 'react-native'
import { AppTheme } from '../themes/AppTheme';
import { getLogin, setLogin } from '../config/AppAuth';
import auth from '@react-native-firebase/auth';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            show: true
        }
        this.userLogin()
    }

    componentDidMount() {
        // console.log('working')
        // this.subscribe = auth().onAuthStateChanged(user => {
        //     if (!user) {
        //         console.log("hello")
        //     }
        // });
        this.backButtonSubscription();

    }

    componentWillUnmount() {
        this.subscribe
    }

    backButtonSubscription = () => {
        const { navigation } = this.props;
        navigation.addListener('focus', this.doOnFocusIn);
        navigation.addListener('blur', this.doOnFocusOut);
    };

    doOnFocusIn = () => {
        BackHandler.addEventListener('hardwareBackPress', this.backClickHandler);
    };

    doOnFocusOut = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.backClickHandler);
    };

    backClickHandler = () => {
        BackHandler.exitApp();
        true;
    };

    userLogin = () => {
        getLogin().then((us) => {
            if (us != null) {
                this.props.navigation.navigate('Home')
                // console.log(us)
            } else {
                // alert('do login')
                return null
            }
        })

    }

    handleChangeEmail = (email) => {
        this.setState({
            email: email
        })
    }

    handleChangePassword = (password) => {
        this.setState({
            password: password
        })
    }

    handleLogin = () => {
        if (this.state.email != '') {
            if (this.state.password != '') {
                this.getApiLogin();
            } else { Toast.show({ text: 'Please enter Password' }) }
        } else { Toast.show({ text: 'Please enter Your email' }) }
    }

    getApiLogin = () => {
        const { email, password } = this.state
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');

                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                // console.error(error,"<====");
                Toast.show({
                    text: "User not found"
                })
            });
    }

    showHide = () => {
        this.setState({
            show: !this.state.show
        })
    }

    handlePassReset = () =>{
        this.props.navigation.navigate('ResetPass')
    }

    render() {
        return (
            <Container style={{ justifyContent: 'center', backgroundColor: "#f8f8ff" }}>
                <Header style={{ backgroundColor: '#FFF', height: 0, elevation: 0 }} translucent={false} androidStatusBarColor={AppTheme.PRIMARY}></Header>
                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                    <Image style={{ height: 80, width: 80 }} source={require('../Assets/Logo.png')} />
                </View>
                <View style={{ padding: 10 }}>
                    <View style={styles.textView}>
                        <View style={{ justifyContent: 'center', flex: 0.1 }}>
                            <Icon style={{ color: AppTheme.PRIMARY }} name="account-circle" type='MaterialCommunityIcons' />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={(email) => this.setState({ email: email })}
                                placeholder="Enter your phone number" style={{ paddingLeft: 5 }} />
                        </View>
                    </View>
                    <View style={styles.textView}>
                        <View style={{ justifyContent: 'center', flex: 0.1 }}>
                            <Icon style={{ color: AppTheme.PRIMARY }} name="lock" type='MaterialCommunityIcons' />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                value={this.state.password}
                                secureTextEntry={this.state.show ? true : false}
                                onChangeText={(password) => this.handleChangePassword(password)}
                                placeholder="Enter your password" style={{ paddingLeft: 5 }} />
                        </View>
                        <View style={{ justifyContent: 'center', flex: 0.1 }}>
                            <TouchableOpacity onPress={() => this.showHide()}>
                                {this.state.show && (
                                    <Icon style={{ color: AppTheme.PRIMARY, fontSize: 20 }} name="eye-off" type='MaterialCommunityIcons' />
                                )}
                                {!this.state.show && (
                                    <Icon style={{ color: AppTheme.PRIMARY, fontSize: 20 }} name="eye" type='MaterialCommunityIcons' />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Button full style={{ borderRadius: 30, backgroundColor: AppTheme.PRIMARY }} onPress={() => this.handleLogin()}>
                            <Text>Login</Text>
                        </Button>
                    </View>
                    <View>
                        <Button full style={{ borderRadius: 30, backgroundColor: AppTheme.PRIMARY }} onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text>Signup</Text>
                        </Button>
                    </View>
                    <View>
                        <List >
                            <ListItem style={{ alignSelf: 'center' }} noBorder={true}>
                                <Text>forget password?</Text>
                                <TouchableOpacity onPress={() => this.handlePassReset()}>
                                    <Text style={{ color: AppTheme.PRIMARY, paddingLeft:2 }}>Reset Password</Text>
                                </TouchableOpacity>
                            </ListItem>
                        </List>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    textView: {
        backgroundColor: 'white',
        borderColor: AppTheme.PRIMARY,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 30,
        marginBottom: 15,
        flexDirection: 'row'
    }
})
