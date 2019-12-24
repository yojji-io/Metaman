/* eslint-disable */
/* prettier-ignore */
import { Feature } from '../common/classes';

import { routes } from './routes';
import { reducer } from './reducers';
import { Requester } from './services';
import { processRequest } from './epics';

export default new Feature({
  routes,
  reducer,
  epics: [ processRequest ],
  createServices: [
    () => ({
      Requester: new Requester(),
    })
  ],
});
