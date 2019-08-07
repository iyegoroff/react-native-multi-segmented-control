import { Platform } from 'react-native'

export const processBorderRadius = (borderRadius: number | undefined) => (
  Platform.select({
    ios: undefined,
    android: borderRadius
  })
)
