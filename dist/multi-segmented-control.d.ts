import React from 'react';
import { NativeProps } from './native-component';
declare type OmittedProps = 'isSingle' | 'borderRadius' | 'backgroundColor';
declare type MultiSegmentedControlProps = Omit<NativeProps, OmittedProps>;
export declare class MultiSegmentedControl extends React.PureComponent<MultiSegmentedControlProps> {
    render(): JSX.Element;
}
export {};
