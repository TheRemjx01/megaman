import {
	FlowData,
	GetEntityId,
} from '@helpers/flow-manager/types';
import { get } from 'lodash';
import { withProps } from 'recompose';
import * as React from 'react';
import { getFlowManager } from '@helpers/flow-manager/flow-manager';

interface GetIncompleteFlowParams {
	flowKey: string;
	getEntityId: GetEntityId;
}

interface GetIncompleteFlowOutput {
	incompleteFlow: FlowData;
}

interface WithIncompleteFlowHOCProps extends GetIncompleteFlowOutput {
	[otherProp: string]: any;
}

export const getIncompleteFlow = ({
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

type WithIncompleteFlowHOC = (
	Component: React.FunctionComponent,
) => React.FunctionComponent<WithIncompleteFlowHOCProps>;

export const withIncompleteFlow = ({
	flowKey,
	getEntityId,
}: GetIncompleteFlowParams): WithIncompleteFlowHOC =>
	withProps(getIncompleteFlow({ flowKey, getEntityId }));
