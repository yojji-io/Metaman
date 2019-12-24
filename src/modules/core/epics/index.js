import { of, from } from 'rxjs';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { ACTIONS } from '../constants';

export const processRequest = (action$, state$, { Requester }) =>
  action$.pipe(
    ofType(ACTIONS.REQUEST_PROCESSING),
    mergeMap(({ workspace, request, extra }) =>
      from(Requester.exec(request)).pipe(
        map(response => ({
          request,
          workspace,
          extra,
          response,
          error: null,
          type: ACTIONS.REQUEST_DONE,
        })),
        catchError(error =>
          of({
            request,
            workspace,
            extra,
            error,
            response: null,
            type: ACTIONS.REQUEST_DONE,
          })
        )
      )
    )
  );
