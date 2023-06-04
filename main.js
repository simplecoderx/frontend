// Imported Modules
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const axios = require('axios');
const dotenv = require('dotenv').config();
const FormData = require('form-data');
const fs = require('fs');

// Global Variables
const isDev = true;
const isMac = process.platform === 'darwin';
const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      // {
      //   label: 'App Logs',
      //   click: logsWindow
      // },
      {
        label: 'About',
        click: aboutWindow
      },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'minimize' },
      { role: 'togglefullscreen' },
    ]
  }
];

// Main Window
const createWindow = () => {
  const main = new BrowserWindow({
    width: isDev ? 1200 : 800,
    height: 900,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if (isDev) {
    main.webContents.openDevTools();
  }

  main.loadFile(path.join(__dirname, "./renderer/login.html"));
};

// About Window
function aboutWindow () {
  const about = new BrowserWindow({
    width: 400,
    height: 400,
    alwaysOnTop: true,
  });

  about.setMenuBarVisibility(false);

  about.loadFile(path.join(__dirname, "./renderer/about.html"));
}

app.whenReady().then(() => {
  // Initialize Functions
  ipcMain.handle('axios.openAI', openAI);
  ipcMain.handle('axios.tesseract', tesseract);
  ipcMain.handle('axios.backendLaravelPost', backendLaravelPost);
  ipcMain.handle('axios.backendLaravelDelete', backendLaravelDelete);
  ipcMain.handle('axios.backendLaravel', backendLaravel);

  // Create Main Window
  createWindow();

  // Start Window
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Close Window
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Main Functions
// Axios OpenAI API
async function openAI(event, sentence, tools_type){
  let result = null;

  const env = dotenv.parsed;
  await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      data: {
        model: "text-davinci-003",
        prompt: ( tools_type == 'English to Another Language' ? "Translate this into: " : "Factual Answering\n\n" ) +  sentence,
        temperature: ( tools_type == 'English to Another Language' ? 0.3 : 0 ),
        max_tokens: ( tools_type == 'English to Another Language' ? 100 : 1000 ),
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + env.APIKEY_OPENAI
      }
    }).then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      result = error.response.data;
    });

  return result;
}

// Axios Tesseract API
async function tesseract(event, filepath){
  let result = null;

  var formData = new FormData();
  formData.append("image", fs.createReadStream(filepath));

  await axios.post('http://backend.test/api/ocr', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      result = error.response.data;
    });

  return result;
}

// Axios LaravelPost API
async function backendLaravelPost(event, method = 'post', id = '', data = null, token = '') {
  let result = null;
  const env = dotenv.parsed;

  await axios({
    method: method,
    url: 'http://backend.test/api/prompts',
    headers:{
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data: data
  }).then(function (response) {
    result = response.data;
  })
  .catch(function (error) {
    result = error.response.data;
  });
return result;
}



// Axios LaravelDelete API
async function backendLaravelDelete(event, method='delete', id = '', data = null, token=''){
  let result = null;
  const env = dotenv.parsed;
  await axios({
      method: method,
      url: 'http://backend.test/api/prompts/' + id,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data
    }).then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      result = error.response.data;
    });
  return result;
}


// Axios Laravel API
async function backendLaravel(event, method, path, data = null, token = ''){
  let result = null;

  await axios({
      method: method,
      url: 'http://backend.test/api/' + path,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data: data
    }).then(function (response) {
      result = response.data;
    })
    .catch(function (error) {
      result = error.response.data;
    });

  return result;
}