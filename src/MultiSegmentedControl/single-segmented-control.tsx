import React from 'react'
import invariant from 'ts-tiny-invariant'
import { NativeProps, NativeComponent } from './native-component'
import { styles } from './styles'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { processTextStyle } from './process-text-style'

type OmittedProps =
  | 'isSingle'
  | 'selectedIndices'
  | 'maxSelected'
  | 'borderRadius'
  | 'borderWidth'
  | 'backgroundColor'
  | 'elevation'

type Props = Omit<NativeProps, OmittedProps> & {
  readonly selectedIndex?: number
}

const RefComponent = (
  props: Props,
  forwardedRef?: React.Ref<React.Component<NativeProps>>
) => {
  const {
    values = [],
    minSelected = 0,
    enabled = true,
    selectedIndex,
    style,
    textStyle,
    selectedTextStyle = textStyle,
    tintColor,
    onChange,
    hideDivider,
    dividerColor,
    ...restProps
  } = props

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
        values={values}
        key={values.join()}
        minSelected={minSelected}
        isSingle={true}
        selectedIndices={selectedIndices}
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
Component.displayName = 'SingleSegmentedControl'
