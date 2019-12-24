/* eslint-disable */
/* prettier-ignore */
import get from 'lodash/get';
import { hasRequestBody } from "../../common/utils/hasRequestBody";

const getUrlObject = path => {
    const url = document.createElement('a');
    url.href = path;
    return url;
};

const generateInfo = (name) => ({
    name: 'Export auth',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
});

const addAuth = (req, config) => {
    const { auth } = config;
    if (auth) {
        const type = auth.type;
        const authAttrsObj = get(auth, type, {});
        const attributes = Object.entries(authAttrsObj).map(([key, value]) => ({
            key,
            value,
            type: typeof value
        }));

        req.auth = {
            type,
            [type]: attributes,
        }
    }

    return req
};

const addHeaders = (req, config) => {
    const { headers } = config;

    req.header = headers.map(({key, value, active}) => ({
       key,
       value,
       type: 'text',
       disabled: !active,
    }));

    return req
};

const addBody = (req, config) => {
    const hasBody = hasRequestBody(config.method);

    if (hasBody) {
        const { data, content } = config;
        req.body = {
            mode: content,
            [content]: data.map(({key, value, active}) => ({key, value, type: 'text', disabled: !active}))
        }
    }

    return req
};

const getQueryString = (queryArr) => {
    const queryParams = new URLSearchParams();
    queryArr.forEach(({key, value}) => queryParams.append(key, value));
    return queryParams.toString();
};

const addUrl = (req, config) => {
    const base = config.baseURL;
    const queryParams = config.params;
    const path = config.url ? config.url.split('/') : [];

    const hasPath = !!path.length;
    const hasQueryParams = !!queryParams.length;

    const fullPath = `${base}${hasPath ? '/' + path.join('/') : ''}${hasQueryParams ? '?' + getQueryString(queryParams) : ''}`;
    const urlObj = getUrlObject(fullPath);
    const url = {
        raw: fullPath,
        protocol: urlObj.protocol.slice(0, -1),
        host: urlObj.host.split('.'),
    };

    if (hasPath) {
        url.path = path;
    }

    if (hasQueryParams) {
        url.query = queryParams.map(({key, value, active }) => ({key, value, disabled: !active}));
    }

    req.url = url;

    return req
};

const generateRequests = (requests) => {
    return requests.map(({name, config}) => {
        const request = {
            method: config.method.toUpperCase()
        };
        addAuth(request, config);
        addHeaders(request, config);
        addUrl(request, config);
        addBody(request, config);

        return {
            name,
            request,
            response: [],
        }
    })
};

const generateFolders = folders => folders.map(({name, requests}) => ({name, item: generateRequests(requests)}));

export const collectionToPostmanCollection = ({ name, requests, folders = [] }) => ({
    info: generateInfo(name),
    item: [...generateFolders(folders),...generateRequests(requests)]
});
