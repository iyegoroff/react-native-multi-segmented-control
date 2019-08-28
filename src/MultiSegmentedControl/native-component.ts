import React from 'react'
import { NativeSyntheticEvent, requireNativeComponent, ViewProps, TextStyle } from 'react-native'

export type NativeEvent = {
  readonly selectedIndices: ReadonlyArray<number>
  readonly selectedValues: ReadonlyArray<string>
  readonly changedIndex: number
  readonly changedIndexSelected: boolean
}

export type NativeProps = ViewProps & {
  readonly values: ReadonlyArray<string>
  readonly selectedIndices?: ReadonlyArray<number>
  readonly tintColor?: string
  readonly enabled?: boolean
  readonly onChange?: (event: NativeSyntheticEvent<NativeEvent>) => void
  readonly hideDivider?: boolean
  readonly isSingle?: boolean
  readonly maxSelected?: number
  readonly minSelected?: number
  readonly dividerColor?: string
  readonly borderRadius?: number
  readonly borderWidth?: number
  readonly backgroundColor?: string
  readonly textStyle?: TextStyle
  readonly selectedTextStyle?: TextStyle
  readonly elevation?: number
}

export const NativeComponent: React.ComponentClass<NativeProps> = requireNativeComponent(
  'MSCMultiSegmentedControl'
)
