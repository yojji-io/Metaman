const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/testing');
const {
  basic,
  constants: { USER_EMAIL, WORKSPACES },
} = require('./mock');

describe('Database rules', () => {
  afterAll(async () => {
    await teardown();
  });

  test('Fail when reading/writing not authorized', async () => {
    const db = await setup();
    const ref = db.collection(WORKSPACES);

    expect(await assertFails(ref.get()));
  });

  test('Success when user logged in', async () => {
    debugger
    const db = await setup(basic.auth, basic.dbMock);
    const ref = db
      .collection(WORKSPACES)
      .where('contributors', 'array-contains', USER_EMAIL);
    expect(await assertSucceeds(ref.get()));
  });
});
