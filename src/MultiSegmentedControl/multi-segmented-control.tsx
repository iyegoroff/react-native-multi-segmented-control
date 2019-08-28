import React from 'react'
import invariant from 'ts-tiny-invariant'
import { NativeProps, NativeComponent } from './native-component'
import { styles } from './styles'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { processTextStyle } from './process-text-style'

type OmittedProps =
  | 'isSingle'
  | 'borderRadius'
  | 'borderWidth'
  | 'backgroundColor'
  | 'elevation'

type Props = Omit<NativeProps, OmittedProps>

const RefComponent = (
  props: Props,
  forwardedRef?: React.Ref<React.Component<NativeProps>>
) => {
  const {
    values = [],
    selectedIndices = [],
    minSelected = 0,
    maxSelected = 0,
    enabled = true,
    style,
    textStyle,
    selectedTextStyle = textStyle,
    tintColor,
    onChange,
    hideDivider,
    dividerColor,
    ...restProps
  } = props

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

  const {
    borderRadius,
    borderWidth,
    backgroundColor,
    elevation,
    ...rest
  } = StyleSheet.flatten(style) || {} as ViewStyle

  return (
    <View
      {...restProps}
      style={[styles.container, rest]}
    >
      <NativeComponent
        tintColor={tintColor}
        onChange={onChange}
        hideDivider={hideDivider}
        dividerColor={dividerColor}
        key={values.join()}
        values={values}
        selectedIndices={selectedIndices}
        minSelected={minSelected}
        maxSelected={maxSelected}
        enabled={enabled}
        style={styles.control}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        backgroundColor={backgroundColor}
        textStyle={processTextStyle(textStyle)}
        selectedTextStyle={processTextStyle(selectedTextStyle)}
        elevation={elevation}
        ref={forwardedRef}
      />
    </View>
  )
}

export const Component = React.forwardRef(RefComponent)
Component.displayName = 'MultiSegmentedControl'
