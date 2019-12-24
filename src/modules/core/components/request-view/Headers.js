/* eslint-disable */
/* prettier-ignore */
import _ from "lodash";
import React, { useMemo } from "react";
import { DynamicParams } from "../request/DynamicParams";

export function Headers({ response: { response } }) {
  const headerObj = _.get(response, 'headers', {});
  const headers = useMemo(() =>
    _.map(headerObj, (value, name) => ({ name, value, active: true })), [headerObj]
  );

  if (!response) {
    return null;
  }

  return (
    <>
      <DynamicParams readonly size="large" value={headers} />
    </>
  );
}
