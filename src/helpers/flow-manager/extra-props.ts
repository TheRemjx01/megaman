export const getUpdateExtraProps = (currentStorageExtraProps: object, keys: string[]) => (
	props: object,
): object => {
	const newExtraProps = {};
	keys.forEach((key) => {
		if (props[key] !== undefined) {
			newExtraProps[key] = props[key];
		}
	});

	return {
		...currentStorageExtraProps,
		...newExtraProps,
	};
};
