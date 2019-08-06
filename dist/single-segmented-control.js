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
import React from 'react';
import invariant from 'ts-tiny-invariant';
import { MSCMultiSegmentedControl } from './native-component';
import { styles } from './styles';
import { View, StyleSheet } from 'react-native';
import { controlKey } from './control-key';
import { processTextStyle } from './process-text-style';
export class SingleSegmentedControl extends React.PureComponent {
    render() {
        const _a = this.props, { values = [], minSelected = 0, enabled = true, selectedIndex, style, textStyle, selectedTextStyle = textStyle } = _a, restProps = __rest(_a, ["values", "minSelected", "enabled", "selectedIndex", "style", "textStyle", "selectedTextStyle"]);
        const selectedIndices = selectedIndex === undefined ? [] : [selectedIndex];
        invariant(minSelected === 0 || values.length >= minSelected, `length of 'values' (${values.length}) should be greater or ` +
            `equal to 'minSelected' (${minSelected})`);
        invariant(minSelected === 0 || selectedIndices.length >= minSelected, `length of 'selectedIndices' (${selectedIndices.length}) should be greater or ` +
            `equal to 'minSelected' (${minSelected})`);
        const _b = StyleSheet.flatten(style) || {}, { borderRadius, backgroundColor } = _b, rest = __rest(_b, ["borderRadius", "backgroundColor"]);
        return (<View style={[styles.container, rest]}>
        <MSCMultiSegmentedControl {...restProps} values={values} key={controlKey(values)} minSelected={minSelected} isSingle={true} selectedIndices={selectedIndices} enabled={enabled} style={styles.control} borderRadius={borderRadius} backgroundColor={backgroundColor} textStyle={processTextStyle(textStyle)} selectedTextStyle={processTextStyle(selectedTextStyle)}/>
      </View>);
    }
}
//# sourceMappingURL=single-segmented-control.js.map