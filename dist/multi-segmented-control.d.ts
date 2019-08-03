import React from 'react';
import { NativeProps } from './native-component';
declare type MultiSegmentedControlProps = Omit<NativeProps, 'isSingle'>;
export declare class MultiSegmentedControl extends React.PureComponent<MultiSegmentedControlProps> {
    render(): JSX.Element;
}
export {};
