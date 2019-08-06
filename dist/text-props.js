import { StyleSheet } from 'react-native';
export const textProps = (textStyle, selectedTextStyle) => {
    const { color: textColor, fontFamily: textFontFamily, fontSize: textFontSize, fontWeight: textFontWeight, fontStyle: textFontStyle } = StyleSheet.flatten(textStyle) || {};
    const { color: selectedTextColor, fontFamily: selectedTextFontFamily, fontSize: selectedTextFontSize, fontWeight: selectedTextFontWeight, fontStyle: selectedTextFontStyle } = StyleSheet.flatten(selectedTextStyle || textStyle) || {};
    return {
        textColor,
        textFontFamily,
        textFontSize,
        textFontWeight,
        textFontStyle,
        selectedTextColor,
        selectedTextFontFamily,
        selectedTextFontSize,
        selectedTextFontWeight,
        selectedTextFontStyle
    };
};
//# sourceMappingURL=text-props.js.map