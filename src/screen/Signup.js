import React, { Component } from 'react';
import { Button, Container, Left, Icon, Right, Body, Title, Input, Card, CardItem, Content, Header, Text, Toast } from 'native-base';
import { TextInput, TouchableOpacity, View, Dimensions, StyleSheet, ScrollView, Image } from 'react-native'
import { AppTheme } from '../themes/AppTheme';
import { Formik } from 'formik'
import { AppConfig } from '../config/AppConfig';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            showP: true,
            showCp: true
        }
    }

    showHideP = () => {
        this.setState({
            showP: !this.state.showP
        })
    }

    showHideCp = () => {
        this.setState({
            showCp: !this.state.showCp
        })
    }

    handleValidation = (values) => {
        if (values.name != '') {
            if (values.email != '') {
                if (this.state.emailPattern.test(values.email)) {
                    if (values.number != '') {
                        if (values.password != '') {
                            if (values.cnpassword != '') {
                                if (values.password == values.cnpassword) {
                                    this.handleSiginUp(values)
                                } else { Toast.show({ text: 'Password mismatched' }) }
                            } else { Toast.show({ text: 'Enter Confirm password' }) }
                        } else { Toast.show({ text: 'Enter your password' }) }
                    } else { Toast.show({ text: 'Enter your mobile number' }) }
                } else { Toast.show({ text: 'Enter correct email' }) }
            } else { Toast.show({ text: 'Enter your email' }) }
        } else { Toast.show({ text: 'Enter your name' }) }
    }

    handleSiginUp = async(values) => {
        console.log(values)
        auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((userCredentials) => {
                if(userCredentials.user){
                    console.log(userCredentials.user,"<======")
                    const update = {
                        displayName: values.name,
                        phoneNumber: values.number
                      };
                      firebase.auth().currentUser.updateProfile(update);
                }
                this.props.navigation.navigate('Login')
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
                    text:"User not found"
                })
            });
            
              
    }

    render() {
        return (
            <Container style={{ justifyContent: 'center', backgroundColor: "#f8f8ff" }}>
                <Header style={{ backgroundColor: '#FFF', height: 0, elevation: 0 }} translucent={false} androidStatusBarColor={AppTheme.PRIMARY}></Header>
                <View style={{ alignItems: 'center', paddingBottom: 20 }}>
                    <Image style={{ height: 80, width: 80 }} source={require('../Assets/Logo.png')} />
                </View>
                <Formik
                    initialValues={{ name: '', email: '', number: '', password: '', cnpassword: '' }}
                    onSubmit={(values) => {
                        this.handleValidation(values)
                    }}
                >
                    {(props) => (
                        <View style={{ padding: 10 }}>
                            <View style={styles.textView}>
                                <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                    <Icon style={{ color: AppTheme.PRIMARY }} name="account-circle" type='MaterialCommunityIcons' />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={props.values.name}
                                        onChangeText={props.handleChange('name')}
                                        placeholder="Enter your name" style={{ paddingLeft: 5 }} />
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                    <Icon style={{ color: AppTheme.PRIMARY }} name="email" type='MaterialCommunityIcons' />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={props.values.email}
                                        onChangeText={props.handleChange('email')}
                                        placeholder="Enter your email" style={{ paddingLeft: 5 }} />
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                    <Icon style={{ color: AppTheme.PRIMARY }} name="cellphone" type='MaterialCommunityIcons' />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={props.values.number}
                                        onChangeText={props.handleChange('number')}
                                        keyboardType='number-pad' maxLength={13} placeholder="Enter your phone number" style={{ paddingLeft: 5 }} />
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                    <Icon style={{ color: AppTheme.PRIMARY }} name="lock" type='MaterialCommunityIcons' />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={props.values.password}
                                        onChangeText={props.handleChange('password')}
                                        secureTextEntry={this.state.showP ? true : false}
                                        placeholder="Your password" style={{ paddingLeft: 5 }} />
                                </View>
                                <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                    <TouchableOpacity onPress={() => this.showHideP()}>
                                        {this.state.showP && (
                                            <Icon style={{ color: AppTheme.PRIMARY, fontSize: 20 }} name="eye-off" type='MaterialCommunityIcons' />
                                        )}
                                        {!this.state.showP && (
                                            <Icon style={{ color: AppTheme.PRIMARY, fontSize: 20 }} name="eye" type='MaterialCommunityIcons' />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                    <Icon style={{ color: AppTheme.PRIMARY }} name="lock-check" type='MaterialCommunityIcons' />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={props.values.cnpassword}
                                        onChangeText={props.handleChange('cnpassword')}
                                        secureTextEntry={this.state.showCp ? true : false}
                                        placeholder="Confirm your password" style={{ paddingLeft: 5 }} />
                                </View>
                                <View style={{ justifyContent: 'center', flex: 0.1 }}>
                                    <TouchableOpacity onPress={() => this.showHideCp()}>
                                        {this.state.showCp && (
                                            <Icon style={{ color: AppTheme.PRIMARY, fontSize: 20 }} name="eye-off" type='MaterialCommunityIcons' />
                                        )}
                                        {!this.state.showCp && (
                                            <Icon style={{ color: AppTheme.PRIMARY, fontSize: 20 }} name="eye" type='MaterialCommunityIcons' />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Button full style={{ borderRadius: 30, backgroundColor: AppTheme.PRIMARY }} onPress={props.handleSubmit}>
                                    <Text>Signup</Text>
                                </Button>
                            </View>
                        </View>
                    )}
                </Formik>
            </Container>
        );
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