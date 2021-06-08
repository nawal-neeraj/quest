import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Footer, FooterTab, Button, Icon, Tab } from 'native-base'
import { AppTheme } from '../themes/AppTheme'

export default class AppFooter extends Component {
    render() {
        const { tab } = this.props;
        return (
            <Footer>
                <FooterTab style={{ backgroundColor: '#FFF' }}>
                    <Button vertical>
                        <Icon name="home" style={[styles.icon, tab == 1 ? styles.iconActive : '']}></Icon>
                        <Text style={[styles.label, tab == 1 ? styles.labelActive : '']}>HOME</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="send-to-mobile" type="MaterialIcons" style={[styles.icon, tab == 1 ? styles.iconActive : '']}></Icon>
                        <Text style={[styles.label, tab == 2 ? styles.labelActive : '']}>POSTPAID</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="gift-outline" type="MaterialCommunityIcons" style={[styles.icon, tab == 1 ? styles.iconActive : '']}></Icon>
                        <Text style={[styles.label, tab == 3 ? styles.labelActive : '']}>GIFT CARD</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="television-classic" type="MaterialCommunityIcons" style={[styles.icon, tab == 1 ? styles.iconActive : '']}></Icon>
                        <Text style={[styles.label, tab == 3 ? styles.labelActive : '']}>Cabel Tv</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="compare-horizontal" type="MaterialCommunityIcons" style={[styles.icon, tab == 1 ? styles.iconActive : '']}></Icon>
                        <Text style={[styles.label, tab == 3 ? styles.labelActive : '']}>History</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        textTransform: "capitalize"
    },
    labelActive: {
        color: AppTheme.PRIMARY
    },
    icon: {
        fontSize: 20,
        color: '#444'
    },
    iconActive: {
        color: AppTheme.PRIMARY
    }
})