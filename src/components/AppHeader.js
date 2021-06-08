import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Header } from 'native-base'
import { AppTheme } from '../themes/AppTheme'

export default class AppHeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Header style={{backgroundColor:AppTheme.PRIMARY}} translucent={false} androidStatusBarColor={AppTheme.PRIMARY}>
                { this.props.children }
            </Header>
        )
    }
}

const styles = StyleSheet.create({})