import { Platform } from 'react-native';
export const controlKey = (values) => Platform.select({
    ios: undefined,
    android: values.join()
});
//# sourceMappingURL=control-key.js.map