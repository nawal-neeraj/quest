import { Body, Button, Container, Content, Header, Icon, Left, Right, Title, Card, CardItem, ListItem, List } from 'native-base'
import React, { Component } from 'react'
import { Text, View, Image, Modal, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, PermissionsAndroid } from 'react-native'
import { AppTheme } from '../themes/AppTheme'
import { clearLogin, getLogin } from '../config/AppAuth';
import { AppConfig, uploadPhoto } from '../config/AppConfig';
import AppHeader from '../components/AppHeader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
var ImagePicker = require('react-native-image-picker');

export default class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: require('../Assets/profile.jpg'),
      uploaded: false,
      image: null,
      showModal: false
    };
  }

  OpenPicker = () => {
    this.setState({
      showModal: true
    })
    
  }

  openCamera = async() => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
  )
  if(granted === PermissionsAndroid.RESULTS.GRANTED){
      ImagePicker.launchCamera(
          {
        includeBase64:true,
        title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      async (resp) => {
        if (resp.didCancel || resp.error) {
          this.setState({uploaded: false});
        } else {
          let img = {uri: resp};
          this.setState({showModal:false})
          this.setState({logo: img.uri.base64, uploaded: true});
          // console.log("resp.fileName==>", img.uri.base64);
          // console.log("resp.fileName==>", img.base64);
          // console.log("fileName==>", img.base64);
          // const fileName = await uploadPhoto(img.uri.base64);
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

  openImageLib = async() => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
  )
  if(granted === PermissionsAndroid.RESULTS.GRANTED){
      ImagePicker.launchImageLibrary(
          {
        includeBase64:true,
        title: 'Select Photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      async (resp) => {
        if (resp.didCancel || resp.error) {
          this.setState({uploaded: false});
        } else {
          let img = {uri: resp.uri};
          this.setState({showModal:false})
          this.setState({logo: img, uploaded: true});
          console.log("resp.fileName==>", resp.base64);
          // console.log("resp.fileName==>", img.base64);
          // console.log("fileName==>", img.base64);
          // const fileName = await uploadPhoto(resp.base64);
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

  render() {
    const { goBack } = this.props.navigation
    return (
      <Container>
        <AppHeader>
          <Left>
            <Button onPress={goBack} transparent>
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
            <View style={{ height: 150, width: 250, alignSelf: 'center', backgroundColor: '#fff', justifyContent: 'center', borderRadius:10, elevation:1}}>
              <ListItem onPress={() => this.openCamera()} style={{ padding: 10}}>
                  <Text style={{ fontSize: 18 }}>Choose Camera</Text>
              </ListItem>
              <ListItem onPress={() => this.openImageLib()} style={{ padding: 10}}>
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
  }
});