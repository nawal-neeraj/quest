import { firebase } from '@react-native-firebase/database';
import { v4 as uuidv4 } from 'uuid'
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { Toast } from 'native-base';
export const AppConfig = {
  API_URL: 'https://www.firstpay.org.in/api/customer/users/?m='
}

export const uploadPhoto = async (imageData) => {
  // console.log(imageData)
  var imageUri = ""
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
        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.log(snapshot.ref.path,"here is the code")
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
    //  console.log(imageUri,"finally uri") 
};