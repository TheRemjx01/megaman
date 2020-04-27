import { mapProps } from 'recompose';

export const propsMapper = (customPropsName, ownPropsKeys) => props => {
    const restPropsObject = {};
    const ownPropsObject = {};
    const allPropKey = Object.keys(props);
    allPropKey.forEach(key => {
        if (ownPropsKeys.includes(key)) {
            ownPropsObject[key] = props[key];
        } else {
            restPropsObject[key] = props[key];
        }
    });
    const propsName = customPropsName;
    return {
        [propsName]: {
            ...ownPropsObject,
        },
        ...restPropsObject,
    };
};

export default (customPropsName, ownPropsKeys) =>
    mapProps(propsMapper(customPropsName, ownPropsKeys));
