import React from 'react'
import { View, Platform } from 'react-native'
import { styles } from './styles'

export const DisabledOverlay = React.memo(({ borderRadius }: { borderRadius?: number }) => (
  Platform.select<React.ReactElement>({
    ios: undefined,
    android: (
      <View style={[styles.overlayWrap, { borderRadius }]}>
        <View style={styles.overlay} />
      </View>
    )
  })
))
