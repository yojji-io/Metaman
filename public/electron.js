const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const serve = require('electron-serve');

const path = require('path');
const isDev = require('electron-is-dev');

const loadURL = serve({directory: 'build'});


let mainWindow;

(async () => {
    await app.whenReady();

    mainWindow = new BrowserWindow();

    if (!isDev) {
      await loadURL(mainWindow);
    } else {
      mainWindow.loadURL('http://localhost:3000')
    }
})();
