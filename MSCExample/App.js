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
} from 'react-native';
import { MultiSegmentedControl, SingleSegmentedControl } from 'react-native-multi-segmented-control'

const onChange = (event) => {
  console.warn(event.nativeEvent)
}

class App extends React.Component {
  state = {
    selectedIndices: [1],
    items: ['dog dog dog dog dog', 'cat', 'fox', 'bee', 'zerg', 'pig'],
    enabled: true
  }

  componentDidMount() {
    // setTimeout(() => this.setState({
    //   selectedIndices: [0, 2, 4]
    // }), 5000)

    // setTimeout(() => this.setState({
    //   items: ['dog dog dog dog dog', 'cat', 'fox', 'bee', 'zerg', 'pig']
    // }), 10000)

    // setTimeout(() => {
    //   this.setState({ enabled: false })

    //   setTimeout(() => {
    //     this.setState({ enabled: true })

    //     setTimeout(() => {
    //       this.setState({ enabled: false })

    //       setTimeout(() => {
    //         this.setState({ enabled: true })
    //       }, 3000)
    //     }, 3000)
    //   }, 3000)
    // }, 3000)
  }

  render() {
    const { items, selectedIndices, enabled } = this.state

    return (
      <View style={styles.container}>
        <MultiSegmentedControl
          momentary={false}
          // tintColor={'red'}
          style={styles.segmented}
          values={items}
          onChange={onChange}
          selectedIndices={selectedIndices}
          maxSelected={3}
          minSelected={1}
          enabled={enabled}
          hideSeparatorBetweenSelectedSegments={true}
          // dividerColor={'green'}
          // textStyle={{
          //   fontWeight: 'normal',
          //   fontSize: 12,
          //   color: 'yellow',
          //   fontFamily: 'Gagarin'
          // }}
        />
        <SingleSegmentedControl
          momentary={false}
          // tintColor={'red'}
          style={styles.segmented}
          values={items}
          selectedIndex={2}
          onChange={onChange}
          minSelected={1}
          // dividerColor={'lightgray'}
          textStyle={{
            fontWeight: 'normal',
            fontSize: 28,
            color: 'yellow',
            fontFamily: 'Gagarin'
          }}
          selectedTextStyle={{
            fontSize: 24,
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
    backgroundColor: '#0000ff80',
    height: 55,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
