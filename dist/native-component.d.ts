import React from 'react';
import { NativeSyntheticEvent, ViewProps } from 'react-native';
declare type NativeEvent = {
    readonly selectedIndices: ReadonlyArray<number>;
    readonly selectedValues: ReadonlyArray<string>;
    readonly changedIndex: number;
    readonly changedIndexSelected: boolean;
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
};
export declare const MSCMultiSegmentedControl: React.ComponentClass<NativeProps>;
export {};
