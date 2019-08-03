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
import { StyleSheet } from 'react-native';
import invariant from 'ts-tiny-invariant';
import { MSCMultiSegmentedControl } from './native-component';
export class SingleSegmentedControl extends React.PureComponent {
    render() {
        const _a = this.props, { values = [], minSelected = 0, enabled = true, selectedIndex, style } = _a, restProps = __rest(_a, ["values", "minSelected", "enabled", "selectedIndex", "style"]);
        const selectedIndices = selectedIndex === undefined ? [] : [selectedIndex];
        invariant(minSelected === 0 || values.length >= minSelected, `length of 'values' (${values.length}) should be greater or ` +
            `equal to 'minSelected' (${minSelected})`);
        invariant(minSelected === 0 || selectedIndices.length >= minSelected, `length of 'selectedIndices' (${selectedIndices.length}) should be greater or ` +
            `equal to 'minSelected' (${minSelected})`);
        return (<MSCMultiSegmentedControl {...restProps} values={values} minSelected={minSelected} isSingle={true} selectedIndices={selectedIndices} enabled={enabled} style={[styles.container, style]}/>);
    }
}
const styles = StyleSheet.create({
    container: {
        height: 28
    }
});
//# sourceMappingURL=single-segmented-control.js.map