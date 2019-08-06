import { ViewStyle, StyleSheet, Platform } from 'react-native'

type Styles = {
  readonly container: ViewStyle
  readonly control: ViewStyle
  readonly background: ViewStyle
}

export const styles = StyleSheet.create<Styles>({
  container: {
    height: Platform.select({
      ios: 28,
      android: 32
    })
  },
  control: {
    width: '100%',
    height: '100%'
  },
  background: Platform.select<ViewStyle>({
    ios: {},
    android: {
      backgroundColor: undefined
    }
  })
})
