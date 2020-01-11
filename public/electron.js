const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const serve = require('electron-serve');

const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const { ipcMain } = require('electron');
const _ = require('lodash');
const loadURL = serve({ directory: 'build' });

const removeBreakLines = (text = '') =>
  _.toString(text).replace(/(\r\n|\n|\r)/gm, '');
// ipcMain

const pathToConfig = path.join(__dirname, '/client-config.json');

ipcMain.on('onFetchConfig', (event, arg) => {
  try {
    const config = fs.readFileSync(pathToConfig, 'utf8');
    const response = {
      type: 'message',
      data: JSON.parse(config),
    };
    event.reply('setConfig', response);
  } catch (err) {
    const response = {
      type: 'error',
      data: err.message,
    };
    event.reply('setConfig', JSON.stringify(response));
  }
});

ipcMain.on('writeTokenToFS', (event, config) => {
  try {
    fs.writeFileSync(pathToConfig, JSON.stringify(config));

    const response = {
      type: 'message',
      data: 'SUCCESS',
    };
    event.reply('tokenWriteResult', response);
  } catch (err) {
    const response = {
      type: 'error',
      data: err.message,
    };
    event.reply('tokenWriteResult', JSON.stringify(response));
  }
});

let mainWindow;

(async () => {
  await app.whenReady();

  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: false,
      nativeWindowOpen: true,
      nodeIntegration: true,
      preload: __dirname + '/preload.js',
    },
  });

  if (!isDev) {
    await loadURL(mainWindow);
  } else {
    await mainWindow.loadURL('http://localhost:3000');
    mainWindow.maximize();
  }
})();
