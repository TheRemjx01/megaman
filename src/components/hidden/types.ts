import React from 'react';

export type ConditionFunc = () => boolean;

export interface IsHiddenParams {
	when: ConditionFunc;
}

export interface EnhancedHiddenProps {
	when: ConditionFunc;
	children: React.ReactNode;
}

export type HiddenHOC = (
	Component: React.Component | React.FunctionComponent,
) => (props: EnhancedHiddenProps) => React.ReactNode;
