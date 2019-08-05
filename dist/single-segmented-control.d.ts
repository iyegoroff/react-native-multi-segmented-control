import React from 'react';
import { NativeProps } from './native-component';
declare type OmittedProps = 'isSingle' | 'selectedIndices' | 'hideSeparatorBetweenSelectedSegments' | 'maxSelected' | 'borderRadius';
declare type SingleSegmentedControlProps = Omit<NativeProps, OmittedProps> & {
    readonly selectedIndex?: number;
};
export declare class SingleSegmentedControl extends React.PureComponent<SingleSegmentedControlProps> {
    render(): JSX.Element;
}
export {};
