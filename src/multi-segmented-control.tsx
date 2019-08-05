import React from 'react'
import invariant from 'ts-tiny-invariant'
import { NativeProps, MSCMultiSegmentedControl } from './native-component'
import { styles } from './styles'
import { View, StyleSheet } from 'react-native'
import { DisabledOverlay } from './disabled-overlay'
import { controlKey } from './control-key'

type MultiSegmentedControlProps = Omit<NativeProps, 'isSingle' | 'borderRadius'>

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

    const { borderRadius } = StyleSheet.flatten(style)

    return (
      <View style={[styles.container, style]}>
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
        />
        {enabled ? undefined : <DisabledOverlay borderRadius={borderRadius} />}
      </View>
    )
  }
}
