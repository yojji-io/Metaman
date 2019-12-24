/* eslint-disable */
/* prettier-ignore */
import { withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { useAuth } from "../hooks";

const STATUS_OK = 'ok';
const STATUS_ERROR = 'error';
const STATUS_UNCHECKED = 'unchecked';

export function autorize({ rules = [], fallback = null, spinner = null, redirect = '/error-403' }) {
  return function wrapper(WrappedComponent) {
    return withRouter(function Autorize(props) {
      const { user, fetched } = useAuth();

      const [ loading, setLoading ] = useState(false);
      const [ status, setStatus ] = useState(STATUS_UNCHECKED);
      
      useEffect(() => {
        function check() {
          if (!fetched) {
            return;
          }

          setLoading(true);
          setStatus(STATUS_UNCHECKED);

          Promise.all(
            rules.map(rule => 
              Promise.resolve(rule(user))
                .then(result => {
                  if (!result) {
                    throw new Error('Invalid permissions') 
                  }

                  setLoading(false);
                  setStatus(STATUS_OK);
                })
                .catch((error) => {
                  if (!fallback) {
                    return props.history.push(redirect)
                  }

                  setLoading(false);
                  setStatus(STATUS_ERROR);
                }),
            ),
          );
        }

        check();
      }, [ fetched, user, props.history ]);

      if (loading || !fetched) {
        return spinner;
      }

      if (status === STATUS_ERROR) {
        return fallback;
      }

      return <WrappedComponent {...props} />
    })
  }
}