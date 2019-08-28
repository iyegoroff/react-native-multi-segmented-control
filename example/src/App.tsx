import React from 'react'
import {
  StyleSheet,
  View,
  NativeSyntheticEvent,
  Text,
  ScrollView
} from 'react-native'
import {
  MultiSegmentedControl,
  SingleSegmentedControl,
  MultiSegmentedControlEvent
} from 'react-native-multi-segmented-control'

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 10,
    padding: 10,
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: 'wheat'
  },
  header: {
    marginBottom: 10
  },
  segmented: {
    elevation: 10,
    height: 55,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const onChange = ({ nativeEvent }: NativeSyntheticEvent<MultiSegmentedControlEvent>) => {
  console.warn(nativeEvent)
}

const disabledSegmentedControl = (
  <View style={styles.section}>
    <Text style={styles.header}>Disabled</Text>
    <MultiSegmentedControl
      style={styles.segmented}
      values={['lemon', 'apple', 'pear']}
      onChange={onChange}
      selectedIndices={[1]}
      enabled={false}
    />
  </View>
)

const singleSegmentedControl = (
  <View style={styles.section}>
    <Text style={styles.header}>Single segment, borderRadius = 0</Text>
    <SingleSegmentedControl
      style={[styles.segmented, { borderRadius: 0 }]}
      values={['lemon', 'apple', 'pear']}
      onChange={onChange}
    />
  </View>
)

const multiSegmentedControl = (
  <View style={styles.section}>
    <Text style={styles.header}>
      Multi segment, maxSelected = 3, minSelected = 1, borderWidth = 3
    </Text>
    <MultiSegmentedControl
      style={[styles.segmented, { backgroundColor: 'orange', borderWidth: 3 }]}
      values={['cat', 'dog', 'fox', 'pig', 'cow']}
      onChange={onChange}
      selectedIndices={[1, 2]}
      maxSelected={3}
      minSelected={1}
      dividerColor={'lightgray'}
      textStyle={{
        fontWeight: 'bold',
        fontSize: 18
      }}
    />
  </View>
)

const altSingleSegmentedControl = (
  <View style={styles.section}>
    <Text style={styles.header}>
      Single segment, custom text styles, minSelected = 1, hideDivider = true
    </Text>
    <SingleSegmentedControl
      tintColor={'red'}
      style={[styles.segmented, { backgroundColor: 'green' }]}
      values={['cat', 'dog', 'fox', 'pig', 'cow']}
      selectedIndex={2}
      onChange={onChange}
      minSelected={1}
      hideDivider={true}
      textStyle={{
        fontSize: 27,
        color: 'yellow',
        fontFamily: 'Gagarin'
      }}
      selectedTextStyle={{
        fontSize: 19,
        color: 'black',
        fontFamily: 'Prisma'
      }}
    />
  </View>
)

const App = () => (
  <ScrollView contentContainerStyle={{ height: '200%' }}>
    {disabledSegmentedControl}
    {singleSegmentedControl}
    {multiSegmentedControl}
    {altSingleSegmentedControl}
  </ScrollView>
)

export default App
