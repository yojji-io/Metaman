/* eslint-disable */
/* prettier-ignore */
import get from 'lodash/get';
import {AUTH_TYPES} from "../constants";

const AUTHORIZATION = 'Authorization';

export class RequesterAuth {
    getBearer (token) {
        return `Bearer ${token.trim()}`;
    }

    getBasicAuth (username, pass) {
        const decodedString = btoa(`${username}:${pass}`);
        return `Basic ${decodedString}`;
    }

    setAuthByType (auth, headers) {
        const authType = get(auth, 'type');

        if (authType === AUTH_TYPES.basic) {
            headers[AUTHORIZATION] = this.getBasicAuth(auth[AUTH_TYPES.basic].username, auth[AUTH_TYPES.basic].password);
        }

        if (authType === AUTH_TYPES.bearer) {
            headers[AUTHORIZATION] = this.getBearer(auth[AUTH_TYPES.bearer].token );
        }
    }
}
