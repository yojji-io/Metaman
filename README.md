<div align="center">
<h1>Metaman</h1>
  <img src="github/undraw_shared_workspace_hwky.svg" alt="metaman logo" height="160">
  <br>
  <br>
  <p>
    Free open-source request builder. Create and test API with your team. <b>Workspaces</b> feature included. Best alternative to Postman
  </p>
  <p>
    <sub>Built in <a href="https://yojji.io">yojji.io</a>
    </sub>
  </p>
</div>

![Metaman screenshot](/github/demo_screen.png 'Screenshot')

## Usecase

You can easily host this application for your team. Just deploy it to [Firebase](https://firebase.google.com/)

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Firebase Cli](https://firebase.google.com/docs/cli)

## Built with

- [React](https://ru.reactjs.org/)
- [Ant Design](https://ant.design/)
- [Firebase](https://firebase.google.com/)
- [Axios](https://github.com/axios/axios)

## Request ✏️

Retrieve response from endpoint instantly.

- Choose `method`
- Enter `URL` and `Path`
- Send request

## Features 📦

- Workspaces - create collection and share with your team
- Environment variables
- Proxy
- Requests history
- Integration with Postman. Available import/export postman collections v2.1
- `JWT` and `Basic` authorizations out of the box

## Installation

- `git clone <repository-url>`
- `cd <project-folder>`
- Install dependencies `yarn install`
- login to firebase (optional)
- Init new project `firebase init` . Choose the next options
  - Create a new project
- After the project was created open it at the firestore console `https://console.firebase.google.com/project/<project-name>/overview`.
- Init Firestore for your project `https://console.firebase.google.com/u/1/project/<project-name>/database/firestore/`
- After Firestore was init deploy firebase rules `firebase deploy --only firestore`
- Setup Authentication provider `https://console.firebase.google.com/u/1/project/<project-name>/authentication/providers` . Enable Google, Github and Email providers.
- Create `/src/config/firebase-client.config.js` file and add the project credentials. [Example](src/config/firebase-client.config.exemple.js). Read more in [firebase documentation](https://firebase.google.com/docs/web/setup).

## Running / Development

```
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Docker

local run

```sh
docker-compose up
```

## Testing

### Firestore rules
- set up emulator (optional) `firebase setup:emulators:firestore`.
- start the firestore emulator `firebase emulators:start --only firestore`. 
- run test `test:fb-rules`.

Launches the test runner in the interactive watch mode.<br />

## Releasing

Build the project

```
yarn build
```

You will find build artifacts in `build` folder.

## How to ❔

1. How to change styles?

   > To override less variables which using antd design change it in **modifyVars** in `config-overrides.js` file in root folder.
   >
   > Detailed instructions for customizing antd themes [here](https://ant.design/docs/react/customize-theme 'Antd customization theme')

2. How to save request to collection?

   > You can make every request what you want, with any params and save it by pushing **Save** or **Save as** to any Collection, which was created before

3. How to add contributor to workspace?
   > 1. Go to specific workspace
   > 2. Select tab workspace in left top corner
   > 3. Click on **Contributors add Icon**, enter contributor's email in appeared modal. When contributor is added, he will be able to see workspace in workspaces list on dashboard main page.

## Authors 🔮

### Lead Developers

- **[Igor Olshevsky](igorolshevsky@yojji.io)** - _Author_
- **[Vlad Tkachev](vlad.tkachov@yojji.io)** - _Developer_
- **[Dmitry Shliahov](dmitryshliahov@yojji.io)** - _Developer_
- **[Yevhen Piotrovskyi](https://github.com/Piotrovskyi)** - _PM_

### Thanks

- [Yojji.io 👩‍💻👨‍💻](https://yojji.io)
