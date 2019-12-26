const faker = require('faker');

const WORKSPACES = 'workspaces';
const COLLECTIONS = 'collections';
const FOLDERS = 'folders';
const REQUESTS = 'requests';
const TEST_WORKSPACE_PATH_ALLOWED = `${WORKSPACES}/${faker.name.title()}`;
const TEST_WORKSPACE_PATH_REJECTED = `${WORKSPACES}/${faker.name.title()}`;
const TEST_COLLECTION_PATH_ALLOWED_LIST = `${TEST_WORKSPACE_PATH_ALLOWED}/${COLLECTIONS}`;
const TEST_COLLECTION_PATH_REJECTED_LIST = `${TEST_WORKSPACE_PATH_REJECTED}/${COLLECTIONS}`;
const TEST_COLLECTION_PATH_ALLOWED_ONE = `${TEST_WORKSPACE_PATH_ALLOWED}/${COLLECTIONS}/${faker.name.title()}`;
const TEST_COLLECTION_PATH_REJECTED_ONE = `${TEST_WORKSPACE_PATH_REJECTED}/${COLLECTIONS}/${faker.name.title()}`;
const TEST_FOLDER_PATH_ALLOWED_LIST = `${TEST_COLLECTION_PATH_ALLOWED_ONE}/${FOLDERS}`;
const TEST_FOLDER_PATH_REJECTED_LIST = `${TEST_COLLECTION_PATH_REJECTED_ONE}/${FOLDERS}`;
const TEST_FOLDER_PATH_ALLOWED_ONE = `${TEST_FOLDER_PATH_ALLOWED_LIST}/${faker.name.title()}`;
const TEST_FOLDER_PATH_REJECTED_ONE = `${TEST_FOLDER_PATH_REJECTED_LIST}/${faker.name.title()}`;
const TEST_REQUEST_PATH_ALLOWED_LIST = `${TEST_FOLDER_PATH_ALLOWED_ONE}/${REQUESTS}`;
const TEST_REQUEST_PATH_REJECTED_LIST = `${TEST_FOLDER_PATH_REJECTED_ONE}/${REQUESTS}`;
const TEST_REQUEST_PATH_ALLOWED_ONE = `${TEST_REQUEST_PATH_ALLOWED_LIST}/${faker.name.title()}`;
const TEST_REQUEST_PATH_REJECTED_ONE = `${TEST_REQUEST_PATH_REJECTED_LIST}/${faker.name.title()}`;

const USER_EMAIL = faker.internet.email();
const SECOND_USER_EMAIL = faker.internet.email();

const workspaceMockData = {
  [TEST_WORKSPACE_PATH_ALLOWED]: {
    contributors: [USER_EMAIL],
    name: faker.name.title(),
    description: faker.name.jobDescriptor(),
  },
  [TEST_WORKSPACE_PATH_REJECTED]: {
    contributors: [SECOND_USER_EMAIL],
    name: faker.name.title(),
    description: faker.name.jobDescriptor(),
  },
};

const auth = {
  uid: 'test',
  email: USER_EMAIL,
  email_verified: true,
};

const collectionsMock = {
  [TEST_COLLECTION_PATH_ALLOWED_ONE]: {
    name: faker.name.title(),
  },
  [TEST_COLLECTION_PATH_REJECTED_ONE]: {
    name: faker.name.title(),
  },
};

const foldersMock = {
  [TEST_FOLDER_PATH_ALLOWED_ONE]: {
    name: faker.name.title(),
  },
  [TEST_FOLDER_PATH_REJECTED_ONE]: {
    name: faker.name.title(),
  },
};

module.exports.basic = {
  dbMock: workspaceMockData,
  auth,
};

module.exports.data = {
  dbMock: { ...workspaceMockData, ...collectionsMock, ...foldersMock },
  auth,
};

module.exports.constants = {
  WORKSPACES,
  TEST_WORKSPACE_PATH_ALLOWED,
  TEST_WORKSPACE_PATH_REJECTED,
  USER_EMAIL,
  SECOND_USER_EMAIL,
  TEST_COLLECTION_PATH_ALLOWED_LIST,
  TEST_COLLECTION_PATH_REJECTED_LIST,
  TEST_COLLECTION_PATH_ALLOWED_ONE,
  TEST_COLLECTION_PATH_REJECTED_ONE,
  TEST_FOLDER_PATH_ALLOWED_LIST,
  TEST_FOLDER_PATH_REJECTED_LIST,
  TEST_FOLDER_PATH_ALLOWED_ONE,
  TEST_FOLDER_PATH_REJECTED_ONE,
  TEST_REQUEST_PATH_ALLOWED_LIST,
  TEST_REQUEST_PATH_REJECTED_LIST,
  TEST_REQUEST_PATH_ALLOWED_ONE,
  TEST_REQUEST_PATH_REJECTED_ONE,
};
