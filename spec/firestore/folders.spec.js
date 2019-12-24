const faker = require('faker');

const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/testing');
const {
    data,
    constants: {
        TEST_FOLDER_PATH_ALLOWED_LIST,
        TEST_FOLDER_PATH_REJECTED_LIST,
        TEST_FOLDER_PATH_ALLOWED_ONE,
        TEST_FOLDER_PATH_REJECTED_ONE,
    },
} = require('./mock');

describe('folder rules', () => {
    let db;

    beforeAll(async () => {
        db = await setup(data.auth, data.dbMock);
    });

    afterAll(async () => {
        await teardown();
    });

    test('Reject create folder in workspace if user email not in contributor list', async () => {
        const ref = db.collection(TEST_FOLDER_PATH_REJECTED_LIST);
        const createFailed = await assertFails(
            ref.add({ name: faker.name.title() })
        );
        expect(await createFailed);
    });

    test('Reject create folder in workspace without name', async () => {
        const ref = db.collection(TEST_FOLDER_PATH_ALLOWED_LIST);
        const createFailed = await assertFails(
            ref.add({})
        );
        expect(await createFailed);
    });

    test('Reject delete folder in workspace if user email not in contributor list', async () => {
        const ref = db.doc(TEST_FOLDER_PATH_REJECTED_ONE);
        const deleteFailed = await assertFails(
            ref.delete()
        );
        expect(await deleteFailed);
    });

    test('Allow create folder in workspace if user email in contributor list', async () => {
        const ref = db.collection(TEST_FOLDER_PATH_ALLOWED_LIST);
        const createSucceeded = await assertSucceeds(
            ref.add({ name: faker.name.title() })
        );
        expect(await createSucceeded);
    });

    test('Allow delete folder in workspace if user email in contributor list', async () => {
        const ref = db.doc(TEST_FOLDER_PATH_ALLOWED_ONE);
        const deleteSucceeded = await assertSucceeds(
            ref.delete()
        );
        expect(await deleteSucceeded);
    });
});
