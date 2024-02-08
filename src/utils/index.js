export * from './constant';

export const setItemInLocalStorage = (key, value) => {
    if (!key || !value) {
        return console.error('Can not store in LS');
    }

    const valueToStore = typeof value !== 'String' ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
}

export const getItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can get the value from LS');
    }

    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can get the value from LS');
    }

    localStorage.removeItem(key);
}

// export const getFormBody = (params) => {
//     let formBody = [];

//     for (let property in params) {
//         let encodedKey = encodeURIComponent(property);
//         let encodedValue = encodeURIComponent(params[property]);

//         formBody.push(encodedKey + '=' + encodedValue);
//     }
//     return formBody.join('&');
// };

export const getFormBody = (params, prefix = '') => {
    const formBody = [];

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            const encodedKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === 'object' && !Array.isArray(item)) {
                        formBody.push(getFormBody(item, `${encodedKey}[${index}]`));
                    } else {
                        const encodedValue = encodeURIComponent(item);
                        formBody.push(`${encodedKey}[${index}]=${encodedValue}`);
                    }
                });
            } else if (typeof value === 'object') {
                formBody.push(getFormBody(value, encodedKey));
            } else {
                const encodedValue = encodeURIComponent(value);
                formBody.push(`${encodedKey}=${encodedValue}`);
            }
        }
    }

    return formBody.join('&');
};
