/* eslint-disable */
/* prettier-ignore */
import {CONTENT_TYPES} from "../constants";

export const updateDataByContentType = (data, headers) => {
    const containContentType = headers.hasOwnProperty('Content-Type');
    const isUrlencoded = headers['Content-Type'] === CONTENT_TYPES.urlencoded;
    if ( containContentType && isUrlencoded) {
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => params.append(key, data[key]));

        return params;
    }

    return data;
};
