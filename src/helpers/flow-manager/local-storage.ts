interface GetLocalStorageParams {
    item: string
}

interface SetLocalStorageParams {
    item: string;
    body: object
}

export const getItemFromLocalStorage = ({ item }: GetLocalStorageParams):object => {
    try {
        return JSON.parse(localStorage.getItem(item));
    } catch (err) {
        console.warn(`Error while trying to parse: [${item}]. Err: ${err}`);
        return null;
    }
};

export const setItemToLocalStorage = ({ item, body }: SetLocalStorageParams):void => {
    localStorage.setItem(item, JSON.stringify(body));
};