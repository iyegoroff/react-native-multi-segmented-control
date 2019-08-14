import React from 'react'
import { NativeSyntheticEvent, requireNativeComponent, ViewProps, TextStyle } from 'react-native'

type NativeEvent = {
  readonly selectedIndices: ReadonlyArray<number>
  readonly selectedValues: ReadonlyArray<string>
  readonly changedIndex: number
  readonly changedIndexSelected: boolean
}

type TextStyleRedux = Omit<TextStyle, 'color'> & {
  readonly color?: number
}

export type NativeProps = ViewProps & {
  readonly values: ReadonlyArray<string>
  readonly selectedIndices?: ReadonlyArray<number>
  readonly tintColor?: string
  readonly momentary?: boolean
  readonly enabled?: boolean
  readonly onChange?: (event: NativeSyntheticEvent<NativeEvent>) => void
  readonly hideDivider?: boolean
  readonly isSingle?: boolean
  readonly maxSelected?: number
  readonly minSelected?: number
  readonly dividerColor?: string
  readonly borderRadius?: number
  readonly backgroundColor?: string
  readonly textStyle?: TextStyleRedux
  readonly selectedTextStyle?: TextStyleRedux
  readonly elevation?: number
}

export const MSCMultiSegmentedControl: React.ComponentClass<NativeProps> = requireNativeComponent(
  'MSCMultiSegmentedControl'
)
