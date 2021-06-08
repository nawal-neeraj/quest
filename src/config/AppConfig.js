export const AppConfig = {
    API_URL : 'https://www.firstpay.org.in/api/customer/users/?m='
}

export const uploadPhoto = async (imageData) => {
    console.log("image====>",imageData);
    let formData = new FormData();
    formData.append('image', imageData);
    console.log(formData._parts,"all form data")
    let url = AppConfig.API_URL + 'upload_photo';
    console.log(url,"<======")
    let resp = await fetch(url, {
      method: 'POST',
      body: formData._parts,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    let result = await resp.json();
    console.log(result,"results")
    return result.data.file;
  };