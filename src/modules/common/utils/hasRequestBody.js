/* eslint-disable */
/* prettier-ignore */
import {HTTP_METHOD} from "../../core/constants";

export const hasRequestBody = (method = 'get') => [
    HTTP_METHOD.PUT,
    HTTP_METHOD.POST,
    HTTP_METHOD.PATCH,
    HTTP_METHOD.DELETE
].includes(method.toLowerCase());
