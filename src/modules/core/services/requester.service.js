import Axios from 'axios';

import { toObject } from '../utils';
import { updateDataByContentType } from '../utils/updateDataByContentType';
import { hasRequestBody } from '../../common/utils/hasRequestBody';
import { RequesterAuth } from './requesterAuth';
import { replaceToEnv } from '../utils/replaceToEnv';

export class Requester extends RequesterAuth {
  constructor() {
    super();
    this.axios = Axios.create();
  }

  exec(options) {
    const {
      headers,
      data,
      params,
      proxy,
      contentType,
      auth,
      env,
      ...rest
    } = options;
    const headerObj = toObject(headers);
    const dataObj = toObject(data);

    if (auth) {
      this.setAuthByType(auth, headerObj);
    }

    if (hasRequestBody(rest.method) && contentType) {
      headerObj['Content-Type'] = contentType;
    }
    const config = replaceToEnv(
      {
        ...rest,
        data: updateDataByContentType(dataObj, headers),
        params: toObject(params),
        headers: headerObj,
      },
      env
    );

    if (proxy) {
      return this.axios({
        data: config,
        method: 'POST',
        url: proxy,
      }).then(({ data }) => data);
    } else {
      return this.axios(config)
        .then(res => res)
        .catch(err => {
          if (err.isAxiosError) {
            return err.response;
          }
        });
    }
  }
}
