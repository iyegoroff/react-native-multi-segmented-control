import React from 'react'
import invariant from 'ts-tiny-invariant'
import { NativeProps, MSCMultiSegmentedControl } from './native-component'
import { styles } from './styles'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { controlKey } from './control-key'
import { processTextStyle } from './process-text-style'

type OmittedProps =
  | 'isSingle'
  | 'borderRadius'
  | 'backgroundColor'

type MultiSegmentedControlProps = Omit<NativeProps, OmittedProps>

export class MultiSegmentedControl extends React.PureComponent<MultiSegmentedControlProps> {

  render() {
    const {
      values = [],
      selectedIndices = [],
      minSelected = 0,
      maxSelected = 0,
      enabled = true,
      style,
      textStyle,
      selectedTextStyle = textStyle,
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

    const { borderRadius, backgroundColor, ...rest } = StyleSheet.flatten(style) || {} as ViewStyle

    return (
      <View style={[styles.container, rest]}>
        <MSCMultiSegmentedControl
          {...restProps}
          key={controlKey(values)}
          values={values}
          selectedIndices={selectedIndices}
          minSelected={minSelected}
          maxSelected={maxSelected}
          enabled={enabled}
          style={styles.control}
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          textStyle={processTextStyle(textStyle)}
          selectedTextStyle={processTextStyle(selectedTextStyle)}
        />
      </View>
    )
  }
}
