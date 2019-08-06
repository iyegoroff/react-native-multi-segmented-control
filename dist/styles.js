import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
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
    background: Platform.select({
        ios: {},
        android: {
            backgroundColor: undefined
        }
    })
});
//# sourceMappingURL=styles.js.map