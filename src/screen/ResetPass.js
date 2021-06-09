import React, { Component } from 'react';
import { Button, Container, Left, Icon, Right, Body, Title, Input, Card, CardItem, Content, Header, Text, Toast, Label, Item } from 'native-base';
import { TextInput, TouchableOpacity, View, Dimensions, StyleSheet, ScrollView, Image } from 'react-native'
import AppHeader from '../components/AppHeader';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export default class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:''
        };
    }

    handleLink = async() =>{
        const {email} = this.state
        try {
            await firebase.auth().sendPasswordResetEmail(email).then(user => {
                this.props.navigation.navigate('Login')
            })
            
          } catch (error) {
            actions.setFieldError('general', error.message);
          }
    }

    render() {
        return (
            <Container>
                <AppHeader>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Reset password</Title>
                    </Body>
                    <Right />
                </AppHeader>
                    <View style={{justifyContent: 'center', alignItems:'center', flex:1}}>
                        <View style={{width:300}}>
                        <Item stackedLabel>
                            <Label>Enter your email:</Label>
                            <Input value={this.state.email}
                            onChangeText={(e) => this.setState({email:e})}
                            />
                        </Item>
                        <View style={{paddingTop:10}}>
                            <Button full onPress={() => this.handleLink()}>
                                <Text>Send link</Text>
                            </Button>
                        </View>
                        </View>
                    </View>
            </Container>
        );
    }
}
