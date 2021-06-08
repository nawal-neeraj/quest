import AsyncStorage from '@react-native-community/async-storage'

export const setLogin = async(user) =>{
    await AsyncStorage.setItem('login', JSON.stringify(user));
}

export const getLogin = async() => {
    let u = await AsyncStorage.getItem('login')
    if(u != null){
        const us = JSON.parse(u);
        return us;
    }else {
        return null;
    }
}

export const clearLogin = async() => {
    await AsyncStorage.clear();
    return true;
}