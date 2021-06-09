// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Login from '../screen/Login';
import Signup from '../screen/Signup';
import Editprofile from '../screen/Editprofile';
import ResetPass from '../screen/ResetPass';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

function AppRouter(){
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
                <Stack.Screen name="EditProfile" component={Editprofile}></Stack.Screen>
                <Stack.Screen name="ResetPass" component={ResetPass}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRouter