/* eslint-disable */
/* prettier-ignore */
import _ from 'lodash';

export async function createServices(features) {
  const servicesList = await Promise.all(
    features.createServices.map(
      fn => fn(),
    ),
  );

  return _.merge(...servicesList);
}
