const faker = require('faker');

const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/testing');
const {
  data,
  constants: {
    WORKSPACES,
    TEST_WORKSPACE_PATH_ALLOWED,
    TEST_WORKSPACE_PATH_REJECTED,
    USER_EMAIL,
  },
} = require('./mock');

describe('workspaces rules', () => {
  let db;

  beforeAll(async () => {
    db = await setup(data.auth, data.dbMock);
  });

  afterAll(async () => {
    await teardown();
  });

  test('Can read if user email in contributors list', async () => {
    const ref = db.doc(TEST_WORKSPACE_PATH_ALLOWED);
    const readSucceeded = await assertSucceeds(ref.get());
    expect(readSucceeded);
  });

  test('Reject read if user email not in contributors list', async () => {
    const ref = db.doc(TEST_WORKSPACE_PATH_REJECTED);
    expect(await assertFails(ref.get()));
  });

  test('Reject create empty workspace', async () => {
    const ref = db.collection(WORKSPACES);
    const createEmptyRejected = assertFails(ref.add({}));
    expect(await createEmptyRejected);
  });

  test('Reject create workspace without contributors', async () => {
    const ref = db.collection(WORKSPACES);
    const createWithoutContributorsRejected = assertFails(
      ref.add({
        name: faker.name.title(),
      })
    );
    expect(createWithoutContributorsRejected);
  });

  test('Allow create with all fields', async () => {
    const ref = db.collection(WORKSPACES);
    const createSucceeded = assertSucceeds(
      ref.add({
        name: faker.name.title(),
        contributors: [USER_EMAIL],
        envs: {},
      })
    );

    expect(await createSucceeded);
  });

  test('Reject create workspace if workspace without name', async () => {
    const ref = db.collection(WORKSPACES);
    const createWithoutNameRejected = assertFails(
      ref.add({
        contributors: [USER_EMAIL],
      })
    );
    expect(await createWithoutNameRejected);
  });

  test('Reject update workspace if user email not in contributors list', async () => {
    const ref = db.doc(TEST_WORKSPACE_PATH_REJECTED);
    const updateRejected = assertFails(
      ref.set(
        {
          contributors: [USER_EMAIL],
        },
        {
          merge: true,
        }
      )
    );
    expect(await updateRejected);
  });

  test('Allow update workspace if user email in contributors list', async () => {
    const ref = db.doc(TEST_WORKSPACE_PATH_ALLOWED);
    const updateSucceeded = assertSucceeds(
      ref.set(
        {
          name: faker.name.title(),
        },
        {
          merge: true,
        }
      )
    );
    expect(await updateSucceeded);
  });

  test('Reject delete workspace if user email not in contributors list', async () => {
    const ref = db.doc(TEST_WORKSPACE_PATH_REJECTED);
    const deleteFailed = assertFails(ref.delete());
    expect(await deleteFailed);
  });

  test('Allow delete workspace if user email in contributors list', async () => {
    const ref = db.doc(TEST_WORKSPACE_PATH_ALLOWED);
    const deleteSucceeded = assertSucceeds(ref.delete());
    expect(await deleteSucceeded);
  });
});
