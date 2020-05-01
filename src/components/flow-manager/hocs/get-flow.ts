import { get } from 'lodash';
import { withProps } from 'recompose';
import * as React from 'react';
import { getFlowManager } from './flow-manager';
import { FlowData, GetEntityId } from './types';

export interface GetIncompleteFlowParams {
	flowKey: string;
	getEntityId: GetEntityId;
}

export interface GetIncompleteFlowOutput {
	incompleteFlow: FlowData;
}

export interface WithIncompleteFlowHOCProps extends GetIncompleteFlowOutput {
	[otherProp: string]: any;
}

export type GetIncompleteFlow = (
	params: GetIncompleteFlowParams,
) => (props: object) => GetIncompleteFlowOutput;

export const getIncompleteFlow: GetIncompleteFlow = ({
	flowKey,
	getEntityId,
}: GetIncompleteFlowParams) => (props: object): GetIncompleteFlowOutput => {
	const entityId = getEntityId(props);
	const flowManager = get(getFlowManager(), `${entityId}`);
	const incompleteFlow = get(flowManager, flowKey);
	return {
		incompleteFlow,
	};
};

export type WithIncompleteFlowProps = GetIncompleteFlowOutput;

type WithIncompleteFlowHOC = (
	Component: React.FunctionComponent<WithIncompleteFlowProps>,
) => any;

export type WithIncompleteFlow = (
	params: GetIncompleteFlowParams,
) => WithIncompleteFlowHOC;

export const withIncompleteFlow: WithIncompleteFlow = ({
	flowKey,
	getEntityId,
}: GetIncompleteFlowParams): WithIncompleteFlowHOC =>
	withProps(getIncompleteFlow({ flowKey, getEntityId }));
