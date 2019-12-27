const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const serve = require('electron-serve');

const path = require('path');
const isDev = require('electron-is-dev');

const loadURL = serve({ directory: 'build' });

let mainWindow;

(async () => {
  await app.whenReady();

  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: false,
      nativeWindowOpen: true,
    },
  });

  if (!isDev) {
    await loadURL(mainWindow);
  } else {
    await mainWindow.loadURL('http://localhost:3000');
    mainWindow.maximize();
  }
})();
