import { branch, renderNothing } from 'recompose';

export type ConditionFunc = () => boolean;

export declare type When = ConditionFunc | boolean;

export declare interface IsHiddenParams {
	when: When;
}

export const isHidden = ({ when }: IsHiddenParams): When => {
	if (typeof when === 'function') {
		return when();
	}
	if (when === undefined || when === null) {
		return true;
	}
	return when;
};

const renderNothingWhileHidden = branch(isHidden, renderNothing);

export default renderNothingWhileHidden;
