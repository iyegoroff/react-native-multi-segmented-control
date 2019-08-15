/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import { MultiSegmentedControl, SingleSegmentedControl } from 'react-native-multi-segmented-control'

const onChange = (event) => {
  console.warn(event.nativeEvent)
}

class App extends React.Component {
  state = {
    selectedIndices: [1],
    items: ['orange', 'apple', 'pear', 'lemon', 'lime'],
    enabled: false
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      selectedIndices: [0, 2, 4]
    }), 5000)

    setTimeout(() => this.setState({
      items: ['dog', 'cat', 'fox', 'bee', 'zerg', 'pig']
    }), 10000)

    setTimeout(() => {
      this.setState({ enabled: false })

      setTimeout(() => {
        this.setState({ enabled: true })

        setTimeout(() => {
          this.setState({ enabled: false })

          setTimeout(() => {
            this.setState({ enabled: true })
          }, 3000)
        }, 3000)
      }, 3000)
    }, 3000)
  }

  render() {
    const { items, selectedIndices, enabled } = this.state

    return (
      <View style={styles.container}>
        <MultiSegmentedControl
          // tintColor={'red'}
          style={styles.segmented}
          values={items}
          onChange={onChange}
          selectedIndices={selectedIndices}
          maxSelected={3}
          minSelected={1}
          enabled={enabled}
          dividerColor={'green'}
          textStyle={{
            fontWeight: 'normal',
            fontSize: 12,
            fontFamily: 'Gagarin'
          }}
        />
        <SingleSegmentedControl
          tintColor={'red'}
          style={styles.segmented}
          values={items}
          selectedIndex={2}
          onChange={onChange}
          minSelected={1}
          // dividerColor={'lightgray'}
          hideDivider={true}
          textStyle={{
            fontWeight: 'normal',
            fontSize: Platform.select({
              ios: 27,
              android: 28
            }),
            color: 'yellow',
            fontFamily: 'Gagarin'
          }}
          selectedTextStyle={{
            fontSize: Platform.select({
              ios: 19,
              android: 22
            }),
            color: 'green',
            fontFamily: 'Prisma'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  segmented: {
    backgroundColor: '#0000ff60',
    elevation: 10,
    height: 55,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowColor: 'black'
  }
});

export default App;
