/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';
import React, { useMemo } from 'react';

const removeBreakLines = (text = '') =>
  _.toString(text).replace(/(\r\n|\n|\r)/gm, '');

export function Raw({ result }) {
  const response = useMemo(
    () => (result ? result.response || result.error : {}),
    [result]
  );

  const data = useMemo(
    () => _.get(response, 'data', _.get(response, 'message')),
    [_.get(response, 'data')]
  );

  return (
    <div style={{ wordBreak: 'break-word' }} className="plaintext">
      {_.isObject(data) ? JSON.stringify(data) : data}
    </div>
  );
}
