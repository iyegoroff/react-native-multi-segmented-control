import React from 'react'
import { ViewStyle, StyleSheet } from 'react-native'
import invariant from 'ts-tiny-invariant'
import { NativeProps, MSCMultiSegmentedControl } from './native-component'

type MultiSegmentedControlProps = Omit<NativeProps, 'isSingle'>

export class MultiSegmentedControl extends React.PureComponent<MultiSegmentedControlProps> {

  render() {
    const {
      values = [],
      selectedIndices = [],
      minSelected = 0,
      maxSelected = 0,
      enabled = true,
      style,
      ...restProps
    } = this.props

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

    invariant(
      maxSelected === 0 || selectedIndices.length <= maxSelected,
      `length of 'selectedIndices' (${selectedIndices.length}) should be less or ` +
      `equal to 'maxSelected' (${maxSelected})`
    )

    return (
      <MSCMultiSegmentedControl
        {...restProps}
        values={values}
        selectedIndices={selectedIndices}
        minSelected={minSelected}
        maxSelected={maxSelected}
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
