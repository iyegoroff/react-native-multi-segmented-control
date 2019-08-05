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
    items: ['dog', 'cat', 'fox', 'bee', 'zerg', 'pig']
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      selectedIndices: [0, 2, 4]
    }), 5000)

    setTimeout(() => this.setState({
      items: ['dog', 'cat', 'fox', 'bee', 'zerg', 'pig']
    }), 10000)
  }

  render() {
    const { items, selectedIndices } = this.state

    return (
      <Fragment>
        <MultiSegmentedControl
          momentary={false}
          // tintColor={'red'}
          style={styles.segmented}
          values={items}
          onChange={onChange}
          selectedIndices={selectedIndices}
          maxSelected={3}
          minSelected={1}
          // enabled={false}
          hideSeparatorBetweenSelectedSegments={true}
          // dividerColor={'green'}
        />
        <SingleSegmentedControl
          momentary={false}
          tintColor={'red'}
          style={styles.segmented}
          values={items}
          selectedIndex={2}
          onChange={onChange}
          minSelected={1}
          dividerColor={'blue'}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  segmented: {
    // backgroundColor: '#0000ff80',
    height: 55,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
