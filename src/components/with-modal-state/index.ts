import { withStateHandlers, compose, setDisplayName } from 'recompose';
import { get } from 'lodash';
import withPropsMapper from '../with-props-mapper';
import * as React from 'react';

type ConditionFunc = (...any: any) => boolean;

export interface InitialModalState {
	isLoading: boolean;
	isVisible: boolean;
}

export interface ModalState extends InitialModalState {
	showLoading: () => void;
	hideLoading: () => void;
	showModal: () => void;
	hideModal: () => void;
}

interface EnhanceModalStateProps {
	[propName: string]: ModalState;
}

export const initState = (
	visibleCondition: ConditionFunc,
	loadingCondition: ConditionFunc,
) => (props: object): InitialModalState => ({
	isLoading: loadingCondition ? loadingCondition(props) : false,
	isVisible: visibleCondition ? visibleCondition(props) : false,
});

export const stateUpdaters = {
	showLoading: () => (): object => ({
		isLoading: true,
	}),

	hideLoading: () => (): object => ({
		isLoading: false,
	}),

	showModal: () => (): object => ({
		isVisible: true,
	}),

	hideModal: () => (): object => ({
		isVisible: false,
	}),
};

const defaultPropName = 'modal';

const ownPropsKeys = [
	'showLoading',
	'hideLoading',
	'showModal',
	'hideModal',
	'isLoading',
	'isVisible',
];

interface Conditions {
	visibleCondition?: ConditionFunc;
	loadingCondition?: ConditionFunc;
}

type WithModalStateV2HOC = (
	Component: React.Component | React.FunctionComponent,
) => (props: EnhanceModalStateProps) => any;

export default (
	propsName: string = defaultPropName,
	conditions: Conditions,
): WithModalStateV2HOC => {
	const visibleCondition = get(conditions, 'visibleCondition');
	const loadingCondition = get(conditions, 'loadingCondition');
	return compose(
		setDisplayName('withModalState'),
		withStateHandlers(
			initState(visibleCondition, loadingCondition),
			stateUpdaters,
		),
		withPropsMapper(propsName, ownPropsKeys),
	);
};
