import React, { Component } from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import AppRouter from './src/Routes/Routes'
import { Root } from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Root>
        <AppRouter />
      </Root>
    );
  }
}
