//Imported Modules
const { app, BrowserWindow, ipcMain  } = require('electron')
const path = require('path')
const axios = require('axios');
const isDev = true;
const dotenv = require('dotenv').config();

 //Main Window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
  })

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
  // Initialize Functions
  ipcMain.handle('axios.openAI', openAI);


  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

async function openAI(event, sentence){
  // return 'Hello World!';
  let results = null;
  const env = dotenv.parsed;
  await axios({
    method:'post',
    url: 'https://api.openai.com/v1/completions',
    data: {
      model: "text-davinci-003",
      prompt: "Correct this to standard English:\n\n" + sentence,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    },
    headers:{
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + env.APIKEY_OPENAI,
    }
  }).then(function (response) {
    results = response.data;
  })
  .catch(function (error) {
    results = error;
  });
  // return env.APIKEY_OPENAI;
    return results;
}
