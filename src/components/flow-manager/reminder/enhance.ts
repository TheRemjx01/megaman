import { withRouter } from 'react-router-dom';
import {
  getFirstIncompleteFlow,
  getIncompleteFlows,
  resetSelectedFlowKeysHandler,
} from '@helpers/index';
import {
  withHandlers,
  withProps,
  compose,
  defaultProps,
} from 'recompose';
import {ModalState, withModalStateV2} from "@shared/hocs";

const enhanceDefaultProps = {
  selectedFlowKeys: [],
  pathToAgreementId: 'match.params.id',
};

interface WithIncompleteFlowDataParams {
  selectedFlowKeys: string[];
  pathToAgreementId: string;
}

export const withIncompleteFlowData = ({
  selectedFlowKeys,
  pathToAgreementId,
  ...otherProps
}: WithIncompleteFlowDataParams): object => getIncompleteFlows({ selectedFlowKeys, pathToAgreementId })(otherProps);

interface CanFlowModalVisibleParams {
  firstIncompleteFlowName: string;
}

export const canFlowModalVisible = ({ firstIncompleteFlowName }: CanFlowModalVisibleParams):boolean =>
  !!firstIncompleteFlowName;

interface OnDiscardIncompleteFlowHandlerParams {
  resetAgreementFlow: () => void;
  incompleteFlowModalState: ModalState,
}

export const onDiscardIncompleteFlowHandler = ({
  resetAgreementFlow,
  incompleteFlowModalState,
}: OnDiscardIncompleteFlowHandlerParams) => ():void => {
  incompleteFlowModalState.showLoading();
  resetAgreementFlow();
  incompleteFlowModalState.hideLoading();
  incompleteFlowModalState.hideModal();
};

interface ReactRouterType {
  push: (string) => void
}

interface ConfirmRestoreIncompleteFlowParams {
  history: ReactRouterType;
  incompleteFlowModalState: ModalState;
  firstIncompleteCurrentUrl: string;
}

export const confirmRestoreIncompleteFlowHandler = ({
  history,
  incompleteFlowModalState,
  firstIncompleteCurrentUrl,
}: ConfirmRestoreIncompleteFlowParams) => ():void => {
  if (!firstIncompleteCurrentUrl) {
    return;
  }
  history.push(firstIncompleteCurrentUrl);
  incompleteFlowModalState.hideModal();
};

const enhance = compose(
  withRouter,
  defaultProps(enhanceDefaultProps),
  withProps(withIncompleteFlowData),
  withProps(getFirstIncompleteFlow),
  withModalStateV2('incompleteFlowModalState', {
    visibleCondition: canFlowModalVisible,
  }),
  withHandlers({
    resetAgreementFlow: resetSelectedFlowKeysHandler,
  }),
  withHandlers({
    discardIncompleteFlow: onDiscardIncompleteFlowHandler,
    confirmRestoreIncompleteFlow: confirmRestoreIncompleteFlowHandler,
  }),
);

export default enhance;
