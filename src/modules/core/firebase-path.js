export const workspaces = {
  all: () => `workspaces`,
  one: ({ workspace }) => `workspaces/${workspace}`,
};

export const collections = {
  all: ({ workspace }) => `workspaces/${workspace}/collections`,
  one: ({ workspace, collection }) =>
    `workspaces/${workspace}/collections/${collection}`,
};

export const folders = {
  all: ({ workspace, collection }) =>
    `workspaces/${workspace}/collections/${collection}/folders`,
  one: ({ workspace, collection, folder }) =>
    `workspaces/${workspace}/collections/${collection}/folders/${folder}`,
};

export const requests = {
  all: ({ workspace, collection, folder }) =>
    !folder
      ? `workspaces/${workspace}/collections/${collection}/requests`
      : `workspaces/${workspace}/collections/${collection}/folders/${folder}/requests`,
  one: ({ workspace, collection, folder, request }) =>
    !folder
      ? `workspaces/${workspace}/collections/${collection}/requests/${request}`
      : `workspaces/${workspace}/collections/${collection}/folders/${folder}/requests/${request}`,
};
