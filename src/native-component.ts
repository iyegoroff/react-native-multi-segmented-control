import React from 'react'
import { NativeSyntheticEvent, requireNativeComponent, ViewProps } from 'react-native'

type NativeEvent = {
  readonly selectedIndices: ReadonlyArray<number>
  readonly selectedValues: ReadonlyArray<string>
  readonly changedIndex: number
  readonly changedIndexSelected: boolean
}

export type NativeProps = ViewProps & {
  readonly values: ReadonlyArray<string>
  readonly selectedIndices?: ReadonlyArray<number>
  readonly tintColor?: string
  readonly momentary?: boolean
  readonly enabled?: boolean
  readonly onChange?: (event: NativeSyntheticEvent<NativeEvent>) => void
  readonly hideSeparatorBetweenSelectedSegments?: boolean
  readonly isSingle?: boolean
  readonly maxSelected?: number
  readonly minSelected?: number
  readonly dividerColor?: string
  readonly borderRadius?: number
}

export const MSCMultiSegmentedControl: React.ComponentClass<NativeProps> = requireNativeComponent(
  'MSCMultiSegmentedControl'
)
