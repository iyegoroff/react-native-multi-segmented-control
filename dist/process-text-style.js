var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { StyleSheet, processColor } from 'react-native';
export const processTextStyle = (style) => {
    const _a = StyleSheet.flatten(style) || {}, { color } = _a, rest = __rest(_a, ["color"]);
    return Object.assign({}, rest, { color: color !== undefined ? processColor(color) : undefined });
};
//# sourceMappingURL=process-text-style.js.map