import { ViewStyle, StyleSheet, Platform } from 'react-native'

type Styles = {
  readonly container: ViewStyle
  readonly control: ViewStyle
  readonly overlayWrap: ViewStyle
  readonly overlay: ViewStyle
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
  overlayWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row'
  },
  overlay: {
    backgroundColor: 'white',
    opacity: 0.5,
    flex: 1,
    height: '100%'
  }
})
