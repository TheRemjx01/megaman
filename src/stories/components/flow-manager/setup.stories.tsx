import { flowManager } from '../../../components/flow-manager/hocs';
import { flowManager } from '../../../components/flow-manager/hocs';

export type ReactRouterMatch = {
	params: {
		id: string | number;
	};
};

export type ReactRouterLocation = {
	url: string;
};

export const prepareIncompleteFlow = ({
	flowKey,
	flowStep,
	flowId,
	flowUrl,
	clearStorage,
}): void => {
	const mockId = flowId;
	const mockUrl = flowUrl;
	const mockMatch: ReactRouterMatch = { params: { id: mockId } };
	const mockLocation: ReactRouterLocation = { url: mockUrl };
	const mockProps = { match: mockMatch, location: mockLocation };
	if (!clearStorage) {
		flowManager.setFlowStep({
			flow: flowKey,
			step: flowStep,
			getEntityId: (props: { match: ReactRouterMatch }) =>
				props.match.params.id,
			getCurrentUrl: (props: { location: ReactRouterLocation }) =>
				props.location.url,
		})(mockProps);
	} else {
		flowManager.clearFlowManagerHandler()();
	}
};
