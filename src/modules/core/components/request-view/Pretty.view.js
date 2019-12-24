/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import typeIs from 'type-is';
import React, { useEffect, useMemo, useState, useRef } from 'react';

export function Pretty({ result }) {
  const ref = useRef();
  const [lang, setLang] = useState(null);

  // const highlight = _.throttle(() =>
  //   (lang && ref.current) ? window.hljs.highlightBlock(ref.current) : null, 500);
  // useEffect(() => { highlight() }, [lang]);

  const response = useMemo(
    () => (result ? result.response || result.error : {}),
    [result]
  );

  useEffect(() => {
    if (response && response.name !== 'Error') {
      !_.isEmpty(response) &&
        setLang(typeIs(response || {}, ['json', 'html', 'xml']));
    }
  }, [response]);

  return lang ? (
    <pre className={`${lang} m-0`}>
      <code ref={ref}>
        {lang === 'json'
          ? JSON.stringify(_.get(response, 'data', ''), null, 2)
          : _.get(response, 'data', '')}
      </code>
    </pre>
  ) : (
    _.get(response, 'message', '')
  );
}
