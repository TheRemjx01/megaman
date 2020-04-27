import { branch, renderNothing } from 'recompose';
import { ConditionFunc, IsHiddenParams } from './types';
import React from 'react';

export const isHidden = ({ when }: IsHiddenParams): ConditionFunc => when;

const renderNothingWhileHidden: (
	Component: React.FunctionComponent | React.Component,
) => any = branch(isHidden, renderNothing);

export default renderNothingWhileHidden;
