import { Platform } from 'react-native'

export const controlKey = (values: ReadonlyArray<string>) => Platform.select({
  ios: undefined,
  android: values.join()
})
