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
          renderIcon={() => <Image
            style={{width: 20, height: 20}}
            source={require('./assets/home.png')} />}
          renderSelectedIcon={() => <Image
            style={{width: 20, height: 20}}
            source={require('./assets/home-active.png')} />}
          badgeText=""
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <View />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'battle'}
          title="Battle"
          renderIcon={() => <Image
            style={{width: 20, height: 20}}
            source={require('./assets/pokeball.png')} />}
          renderSelectedIcon={() => <Image
            style={{width: 20, height: 20}}
            source={require('./assets/pokeball-active.png')} />}
          renderBadge={() => <View />}
          onPress={() => this.setState({ selectedTab: 'battle' })}>
          <View />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'chat'}
          title="Chat"
          renderIcon={() => <Image
            style={{width: 20, height: 20}}
            source={require('./assets/chat.png')} />}
          renderSelectedIcon={() => <Image
            style={{width: 20, height: 20}}
            source={require('./assets/chat-active.png')} />}
          renderBadge={() => <View />}
          onPress={() => this.setState({ selectedTab: 'chat' })}>
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
