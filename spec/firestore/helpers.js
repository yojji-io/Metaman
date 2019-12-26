const firebase = require('@firebase/testing');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const rules = fs.readFileSync('firestore.rules', 'utf8');

module.exports.setup = async (auth, data) => {
  const projectId = `rules-spec-${uuidv4()}`;
  const adminApp = firebase.initializeAdminApp({ projectId }).firestore();
  const app = await firebase.initializeTestApp({
    projectId,
    auth,
  });

  const db = app.firestore();

  if (data) {
    for (const key in data) {
      const ref = adminApp.doc(key);
      await ref.set(data[key]);
    }
  }

  await firebase.loadFirestoreRules({
    projectId,
    rules,
  });

  return db;
};

module.exports.teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()));
};
