import { TextStyle } from 'react-native';
export declare const textProps: (textStyle: TextStyle | undefined, selectedTextStyle: TextStyle | undefined) => {
    textColor: string | undefined;
    textFontFamily: string | undefined;
    textFontSize: number | undefined;
    textFontWeight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    textFontStyle: "normal" | "italic" | undefined;
    selectedTextColor: string | undefined;
    selectedTextFontFamily: string | undefined;
    selectedTextFontSize: number | undefined;
    selectedTextFontWeight: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined;
    selectedTextFontStyle: "normal" | "italic" | undefined;
};
