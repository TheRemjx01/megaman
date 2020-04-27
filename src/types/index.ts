import * as React from 'react';

export type AnyComponent = React.Component | React.FunctionComponent;

export type HOC<T> = (Component: AnyComponent) => T;
