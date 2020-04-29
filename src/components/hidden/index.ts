import enhance, { When } from './enhance';
import Hidden from './Hidden';
import * as React from 'react';

export declare type EnhancedHiddenProps = {
	when?: When;
	children: React.ReactElement | string;
};

export type HiddenProps = React.FC<EnhancedHiddenProps>;

const EnhancedHidden: HiddenProps = enhance(Hidden);

export default EnhancedHidden;
