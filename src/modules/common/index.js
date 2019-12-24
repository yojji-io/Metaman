/* eslint-disable */
/* prettier-ignore */
import { Feature } from './classes';

import { routes } from './routes';
import { reducer } from './reducers';

export default new Feature({
  routes,
  reducer,
  createServices: [
    () => ({
      Rand: () => Math.random(),
    }),
  ],
});
