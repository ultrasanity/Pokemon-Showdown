import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

export default class App extends React.Component {
  state = { selectedTab: 'home' };

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={() => <Image source={require('./assets/home.png')} />}
          renderSelectedIcon={() => <Image source={require('./assets/home.png')} />}
          badgeText="!"
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <View />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Image source={require('./assets/home.png')} />}
          renderSelectedIcon={() => <Image source={require('./assets/home.png')} />}
          renderBadge={() => <View />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          <View />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          renderIcon={() => <Image source={require('./assets/home.png')} />}
          renderSelectedIcon={() => <Image source={require('./assets/home.png')} />}
          renderBadge={() => <View />}
          onPress={() => this.setState({ selectedTab: 'profile' })}>
          <View />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
