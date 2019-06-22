import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text } from 'react-native';
import { Card } from 'react-native-material-ui';

export default class HomeView extends Component {
  render() {
      return (
        <ScrollView>
          <Text style={{fontSize:70}}>Scroll me plz</Text>
          <Card>
            <Text>Hello world!</Text>
          </Card>
        </ScrollView>
    );
  }
}

// skip these lines if using Create React Native App
AppRegistry.registerComponent(
  'showdown-app',
  () => HomeView);
