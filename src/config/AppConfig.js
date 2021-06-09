import { firebase } from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import storage from '@react-native-firebase/storage';
export const AppConfig = {
    API_URL : 'https://www.firstpay.org.in/api/customer/users/?m='
}

export const uploadPhoto = async (imageData) => {
  console.log(imageData)
  const ref = firebase
  .storage()
  .ref()
  .child(uuid.v4());

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", imageData, true);
    xhr.send(null);
  });
  
  var mimeString = uri.split(",")[0].split(":")[1].split(";")[0];

    const snapshot = await ref.put(blob, { contentType: mimeString });
    let url = await snapshot.ref.getDownloadURL();
    // let result = await resp.json();
    console.log(url,"results")
    // return result.data.file;
  };