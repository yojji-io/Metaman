/* eslint-disable */
/* prettier-ignore */
export const props = (state, props) => props;
export const firebaseMap = ({ firestore }) => firestore.data;
export const firebaseList = ({ firestore }) => firestore.ordered;
export const routeId = (state, { match: { params } }) => params.id;
