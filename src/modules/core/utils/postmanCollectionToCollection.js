/* eslint-disable */
/* prettier-ignore */
import get from 'lodash/get';
import { AUTH_DEFAULTS, AUTH_TYPES, CONTENT_TYPES } from "../constants";
import { hasRequestBody } from "../../common/utils/hasRequestBody";

const availableBodyMods = {
    RAW: 'raw',
    URLENCODED: 'urlencoded'
};
const availableAuthTypes = Object.keys(AUTH_TYPES);

const PROTOCOL_DEFAULT = 'http';
const HOST_DEFAULT = 'localhost';

const getBodyParams = body => {
    if (!body) {
        return []
    }
    const mode = body.mode;
    const params = get(body, mode);
    if (body.mode === availableBodyMods.RAW) {
        const paramsObject = JSON.parse(params);
        return Object.entries(paramsObject).map(([key, value]) => ({key, name: key, value, active: true}))
    }

    if (body.mode === availableBodyMods.URLENCODED) {
        return params.map(({key, value, disabled}) => ({key, name: key, value, active: !disabled }))
    }

    // todo add encoding another body mods from postman
    return []
};

const getContentType = body => CONTENT_TYPES[body.mode] || CONTENT_TYPES.urlencoded;

const getAuth = (postmanAuth) => {
    const type = get(postmanAuth, ['type']);

    if (availableAuthTypes.includes(type)) {
        const authKeys = postmanAuth[type].reduce((auth, {key, value}) => {
            auth[key] = value;
            return auth;
        }, {});

        return {
            type,
            [type]: {...AUTH_DEFAULTS[type][type],...authKeys},
        }
    }

    return null;
};

const getBaseUrl = postmanHostUrl => {
    const { protocol = PROTOCOL_DEFAULT, host = HOST_DEFAULT } = postmanHostUrl;
    const hostString = typeof host === 'object'
        ? host.join('.')
        : host;

    return `${protocol}://${hostString}/`
};

const getQueryParams = (urlObject) => {
    const query = get(urlObject, 'query', []);
    return query.map(({key, value, disabled}) => ({key, name: key, value, active: !disabled}))
};

const parsePostmanRequest = requestItem => {
    const request = requestItem.request;
    const hasBody = hasRequestBody(request.method.toLowerCase());
    const hasAuth = requestItem.request.hasOwnProperty('auth');


    const config = {
        baseURL: getBaseUrl(request.url),
        data: [],
        headers: request.header.map(({key, value, disabled}) => ({key, name: key, value, active: !disabled })),
        method: request.method.toLowerCase(),
        params: getQueryParams(request.url),
        url: request.url.path ? request.url.path.join('/') : ''
    };

     if (hasAuth) {
        config.auth = getAuth(request.auth);
     }

     if (hasBody) {
         config.data = getBodyParams(request.body);
     }

     if (request.body) {
         config.content = getContentType(request.body);
     }

    return {
        name: requestItem.name,
        config,
    }
};

const isRequest = item => item.hasOwnProperty('request');
const isFolder = item => item.hasOwnProperty('item');

const getFlatRequests = (requests = [], collectionItem) => {
    if (isRequest(collectionItem)) {
        requests = [...requests, parsePostmanRequest(collectionItem)]
    }

    if (isFolder(collectionItem)) {
        requests = [...requests, ...collectionItem.item.reduce(getFlatRequests, [])]
    }

    return requests;
};

const getFoldersAndRequests = (acc, item) => {
    if (isRequest(item)) {
        acc.requests = [...acc.requests, parsePostmanRequest(item)]
    }

    if (isFolder(item)) {
        const requests = item.item.reduce(getFlatRequests, []);
        const { name } = item;
        acc.folders = [...acc.folders, { name, requests } ]
    }

    return acc;
};

export const postmanCollectionToCollection = postmanCollection => {
    const { requests, folders } = postmanCollection.item.reduce(getFoldersAndRequests, {requests: [], folders: []});
    return {
        name: postmanCollection.info.name,
        requests,
        folders
    };
};

