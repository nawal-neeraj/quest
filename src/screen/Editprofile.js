import { Body, Button, Container, Content, Header, Icon, Left, Right, Title, Card, CardItem, ListItem, List } from 'native-base'
import React, { Component } from 'react'
import { Text, View, ActivityIndicator, Modal, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, PermissionsAndroid, TextInput } from 'react-native'
import { AppTheme } from '../themes/AppTheme'
import { clearLogin, getLogin } from '../config/AppAuth';
import { AppConfig, uploadPhoto } from '../config/AppConfig';
import AppHeader from '../components/AppHeader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');
import database, { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { v4 as uuidv4 } from 'uuid'
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { Toast } from 'native-base';


export default class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: require('../Assets/profile.jpg'),
      uploaded: false,
      image: null,
      showModal: false,
      name: '',
      password: '',
      loader: true
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
            this.uploadPhoto(resp.uri);
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
            console.log("fileName==>", resp.uri);
            this.uploadPhoto(resp.uri);
            
          }
        },
      )
    }
  }

  uploadPhoto = (imageData) => {
    const imageFile = imageData.split(',').pop();
  console.log("My image File", imageFile)
  const uuid = uuidv4();
  // console.log(uuid,"<++")
  const imageName = `${uuid}.${imageFile}`;
  // console.log(imageName,"dekhte hain")
  var storageref = firebase.storage().ref(`profile.image/${imageName}`)
  storageref.putFile(imageData)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // console.log(snapshot, "lets see")
        this.setState({loader:false})
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.log(snapshot.ref.path,"here is the code")
          this.setState({loader:true})
          firebase.storage().ref(snapshot.ref.path).getDownloadURL().then((downloadURL) => {
            // console.log("file avilable", downloadURL)
            Toast.show({
              text:'Picture updatetd successfully'
            })
            const update = {
              photoURL: downloadURL
            };
            firebase.auth().currentUser.updateProfile(update);
          })
        }
      },
      error => {
        unsubscribe();
        console.log(error.toString())
      }
    )
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
            {this.state.loader && (
            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
              <Button onPress={() => this.OpenPicker()} transparent>
                <Icon name="camera" style={{ color: AppTheme.PRIMARY, fontSize: 40 }} />
              </Button>
            </View>
            )}
            {!this.state.loader && (
              <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            )}
          </ImageBackground>
          <View style={{ padding:10 }}>
            <Text style={{fontSize:25, fontWeight:'bold'}}>Upload your profile Picture</Text>
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