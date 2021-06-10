import { Body, Button, Container, Content, Header, Icon, Left, Right, Title, Card, CardItem, ListItem, List } from 'native-base'
import React, { Component } from 'react'
import { Text, View, Image, Modal, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, PermissionsAndroid, TextInput } from 'react-native'
import { AppTheme } from '../themes/AppTheme'
import { clearLogin, getLogin } from '../config/AppAuth';
import { AppConfig, uploadPhoto } from '../config/AppConfig';
import AppHeader from '../components/AppHeader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: require('../Assets/profile.jpg'),
      uploaded: false,
      image: null,
      showModal: false,
      name: '',
      password: ''
    };
  }

  OpenPicker = () => {
    this.setState({
      showModal: true
    })

  }
  componentDidMount() {
    const user = firebase.auth().currentUser;

    if (user) {
      console.log('User email: ', user);
    }

    //     if (!user) {
    //         console.log("hello")
    //     }
    //     console.log(user._user,"details")
    // });
  }

  openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.launchCamera(
        {
          includeBase64: true,
          title: 'Select Photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        },
        async (resp) => {
          if (resp.didCancel || resp.error) {
            this.setState({ uploaded: false });
          } else {
            let img = { uri: resp };
            this.setState({ showModal: false })
            this.setState({ logo: img.uri.base64, uploaded: true });
            // console.log("resp.fileName==>", img.uri.base64);
            // console.log("resp.fileName==>", img.base64);
            // console.log("fileName==>", img.base64);
            const fileName = await uploadPhoto(img.uri.base64);
            // const fileName = uploadPhoto(img.uri);
            //   if(fileName){
            //     this.setState({
            //       buttonShow:false
            //     })
            //   }
            // console.log("my file name ==>", fileName);

            //   this.setState({image: fileName});
          }
        },
      )
    }
  }

  openImageLib = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      ImagePicker.launchImageLibrary(
        {
          includeBase64: true,
          title: 'Select Photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        },
        async (resp) => {
          if (resp.didCancel || resp.error) {
            this.setState({ uploaded: false });
          } else {
            let img = { uri: resp.uri };
            this.setState({ showModal: false })
            this.setState({ logo: img, uploaded: true });
            // console.log("resp.fileName==>", resp.base64);
            // console.log("resp.fileName==>", img.base64);
            console.log("fileName==>", resp.uri);
            const fileName = await uploadPhoto(resp.uri);
            console.log(fileName,"url edit page")
            // const fileName = uploadPhoto(img.uri);
            //   if(fileName){
            //     this.setState({
            //       buttonShow:false
            //     })
            //   }
            // console.log("my file name ==>", fileName);

            //   this.setState({image: fileName});
          }
        },
      )
    }
  }

  updateProf = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      console.log('User email: ', user);
    }
    const update = {
      displayName: this.state.name,
      phoneNumber: this.state.phone
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.props.navigation.push('Profile')
    // try {
    //   // const userCredentials = await auth()
    //   //   .createUserWithEmailAndPassword(this.state.name, this.state.password);
    //   if (userCredentials.user) {
    //     console.log(userCredentials.user);
    //     await userCredentials.user.updateProfile({
    //       displayName: 'Nawal'
    //     });
    //     await userCredentials.user.reload();
    //     this.setState({ user: firebase.auth().currentUser });
    //     console.warn('yo:', this.state.user);
    //   }
    // } catch (error) {
    //   console.warn(`error:, ${error}`);
    // }
  }

  render() {
    const { push } = this.props.navigation
    return (
      <Container>
        <AppHeader>
          <Left>
            <Button onPress={() => push('Profile')} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              Edit Profile
                  </Title>
          </Body>
          <Right />
        </AppHeader>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={true}
        >
          <ImageBackground source={this.state.logo} style={{ height: 180, width: '100%' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
              <Button onPress={() => this.OpenPicker()} transparent>
                <Icon name="camera" style={{ color: AppTheme.PRIMARY, fontSize: 40 }} />
              </Button>
            </View>
          </ImageBackground>
          <View style={{ paddingTop: 20 }}>
            <View style={styles.textView}>
              <View style={{ justifyContent: 'center', flex: 0.1 }}>
                <Icon style={{ color: AppTheme.PRIMARY }} name="cellphone" type='MaterialCommunityIcons' />
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  value={this.state.name}
                  onChangeText={(e) => this.setState({ name: e })}
                  placeholder="Enter your Name" style={{ paddingLeft: 5 }} />
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal transparent={true} animationType="fade" visible={this.state.showModal} >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
              flex: 1,
            }}
            onPress={() => this.setState({ showModal: false })}
            activeOpacity={1}
          >
            <View style={{ height: 150, width: 250, alignSelf: 'center', backgroundColor: '#fff', justifyContent: 'center', borderRadius: 10, elevation: 1 }}>
              <ListItem onPress={() => this.openCamera()} style={{ padding: 10 }}>
                <Text style={{ fontSize: 18 }}>Choose Camera</Text>
              </ListItem>
              <ListItem onPress={() => this.openImageLib()} style={{ padding: 10 }}>
                <Text style={{ fontSize: 18 }}>Open Gallery</Text>
              </ListItem>
            </View>
          </TouchableOpacity>
        </Modal>
        <Button full onPress={() => this.updateProf()}>
          <Text style={{ color: '#fff' }}>Update</Text>
        </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFF'
  },
  textView: {
    backgroundColor: 'white',
    borderColor: AppTheme.PRIMARY,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 30,
    marginBottom: 15,
    flexDirection: 'row'
  }
});