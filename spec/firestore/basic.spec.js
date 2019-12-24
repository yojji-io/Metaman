const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/testing');
const { basic } = require('./mock');

describe('Database rules', () => {
  afterAll(async () => {
    await teardown();
  });

  test('Fail when reading/writing not authorized', async () => {
    const db = await setup();
    const ref = db.collection('workspaces');

    expect(await assertFails(ref.get()));
  });

  test('Success when user logged in', async () => {
    const db = await setup({
      uid: 'test',
      email: 'test@mail.com',
    }, basic.dbMock);
    const ref = db
      .collection('workspaces')
      .where('contributors', 'array-contains', 'test@mail.com');
    expect(await assertSucceeds(ref.get()));
  });
});
