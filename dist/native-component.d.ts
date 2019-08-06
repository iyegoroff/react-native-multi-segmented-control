import React from 'react';
import { NativeSyntheticEvent, ViewProps, TextStyle } from 'react-native';
declare type NativeEvent = {
    readonly selectedIndices: ReadonlyArray<number>;
    readonly selectedValues: ReadonlyArray<string>;
    readonly changedIndex: number;
    readonly changedIndexSelected: boolean;
};
declare type TextStyleRedux = Omit<TextStyle, 'color'> & {
    readonly color?: number;
};
export declare type NativeProps = ViewProps & {
    readonly values: ReadonlyArray<string>;
    readonly selectedIndices?: ReadonlyArray<number>;
    readonly tintColor?: string;
    readonly momentary?: boolean;
    readonly enabled?: boolean;
    readonly onChange?: (event: NativeSyntheticEvent<NativeEvent>) => void;
    readonly hideSeparatorBetweenSelectedSegments?: boolean;
    readonly isSingle?: boolean;
    readonly maxSelected?: number;
    readonly minSelected?: number;
    readonly dividerColor?: string;
    readonly borderRadius?: number;
    readonly backgroundColor?: string;
    readonly textStyle?: TextStyleRedux;
    readonly selectedTextStyle?: TextStyleRedux;
};
export declare const MSCMultiSegmentedControl: React.ComponentClass<NativeProps>;
export {};
