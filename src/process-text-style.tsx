import { StyleProp, TextStyle, StyleSheet, processColor } from 'react-native'

export const processTextStyle = (style: StyleProp<TextStyle>) => {
  const { color, ...rest } = StyleSheet.flatten(style) || {} as TextStyle

  return {
    ...rest,
    color: color !== undefined ? processColor(color) : undefined
  } as TextStyle
}
