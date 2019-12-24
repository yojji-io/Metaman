/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import React, { useRef, useEffect } from 'react';

function stripScripts(s) {
  var div = document.createElement('div');
  div.innerHTML = s;
  var scripts = div.getElementsByTagName('script');
  var i = scripts.length;
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i]);
  }
  return div.innerHTML;
}

export function Preview({ result }) {
  const iframe = useRef();
  useEffect(() => {
    const data = _.get(result, 'response.data', _.get(result, 'error.message'));

    if (iframe.current) {
      const prettied = _.isObject(data)
        ? JSON.stringify(data)
        : stripScripts(data);

      iframe.current.contentWindow.document.body.innerHTML = prettied;
    }
  }, [result, iframe]);

  return (
    <iframe
      sandbox="allow-same-origin"
      style={{
        width: '100%',
        border: 'none' /** border: '1px solid #e7e7e7' */,
      }}
      ref={iframe}
      title="Preview"
    />
  );
}
