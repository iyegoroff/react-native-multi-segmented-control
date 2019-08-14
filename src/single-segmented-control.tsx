import React from 'react'
import invariant from 'ts-tiny-invariant'
import { NativeProps, MSCMultiSegmentedControl } from './native-component'
import { styles } from './styles'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { processTextStyle } from './process-text-style'

type OmittedProps =
  | 'isSingle'
  | 'selectedIndices'
  | 'hideSeparatorBetweenSelectedSegments'
  | 'maxSelected'
  | 'borderRadius'
  | 'backgroundColor'
  | 'elevation'

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
      textStyle,
      selectedTextStyle = textStyle,
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

    const {
      borderRadius,
      backgroundColor,
      elevation,
      ...rest
    } = StyleSheet.flatten(style) || {} as ViewStyle

    return (
      <View style={[styles.container, rest]}>
        <MSCMultiSegmentedControl
          {...restProps}
          values={values}
          key={values.join()}
          minSelected={minSelected}
          isSingle={true}
          selectedIndices={selectedIndices}
          enabled={enabled}
          style={styles.control}
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          textStyle={processTextStyle(textStyle)}
          selectedTextStyle={processTextStyle(selectedTextStyle)}
          elevation={elevation}
        />
      </View>
    )
  }
}
