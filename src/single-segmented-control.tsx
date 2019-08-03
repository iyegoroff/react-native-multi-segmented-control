import React from 'react'
import { ViewStyle, StyleSheet } from 'react-native'
import invariant from 'ts-tiny-invariant'
import { NativeProps, MSCMultiSegmentedControl } from './native-component'

type OmittedProps =
  | 'isSingle'
  | 'selectedIndices'
  | 'hideSeparatorBetweenSelectedSegments'
  | 'maxSelected'

type SingleSegmentedControlProps = Omit<NativeProps, OmittedProps> & {
  readonly selectedIndex?: number
}

export class SingleSegmentedControl extends React.PureComponent<SingleSegmentedControlProps> {

  render() {
    const {
      values = [],
      minSelected = 0,
      enabled = true,
      selectedIndex,
      style,
      ...restProps
    } = this.props

    const selectedIndices = selectedIndex === undefined ? [] : [selectedIndex]

    invariant(
      minSelected === 0 || values.length >= minSelected,
      `length of 'values' (${values.length}) should be greater or ` +
      `equal to 'minSelected' (${minSelected})`
    )

    invariant(
      minSelected === 0 || selectedIndices.length >= minSelected,
      `length of 'selectedIndices' (${selectedIndices.length}) should be greater or ` +
      `equal to 'minSelected' (${minSelected})`
    )

    return (
      <MSCMultiSegmentedControl
        {...restProps}
        values={values}
        minSelected={minSelected}
        isSingle={true}
        selectedIndices={selectedIndices}
        enabled={enabled}
        style={[styles.container, style]}
      />
    )
  }
}

type Styles = {
  readonly container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    height: 28
  }
})
