import React from 'react'
import invariant from 'ts-tiny-invariant'
import { NativeProps, MSCMultiSegmentedControl } from './native-component'
import { styles } from './styles'
import { View, StyleSheet } from 'react-native'
import { controlKey } from './control-key'
import { DisabledOverlay } from './disabled-overlay'

type OmittedProps =
  | 'isSingle'
  | 'selectedIndices'
  | 'hideSeparatorBetweenSelectedSegments'
  | 'maxSelected'
  | 'borderRadius'

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

    const { borderRadius } = StyleSheet.flatten(style)

    return (
      <View style={[styles.container, style]}>
        <MSCMultiSegmentedControl
          {...restProps}
          values={values}
          key={controlKey(values)}
          minSelected={minSelected}
          isSingle={true}
          selectedIndices={selectedIndices}
          enabled={enabled}
          style={styles.control}
          borderRadius={borderRadius}
        />
        {enabled ? undefined : <DisabledOverlay borderRadius={borderRadius} />}
      </View>
    )
  }
}
