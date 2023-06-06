const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld("axios", {
  openAI: (sentence, tools, selectedLanguage) => ipcRenderer.invoke('axios.openAI', sentence, tools, selectedLanguage),
  tesseract: (image) => ipcRenderer.invoke('axios.tesseract', image),
  backendLaravelPost: (method, id, data, token) => ipcRenderer.invoke('axios.backendLaravelPost', method, id, data, token),
  backendLaravelDelete: (method, id, data, token) => ipcRenderer.invoke('axios.backendLaravelDelete', method, id, data, token),
  backendLaravel: (method, path, data, token) => ipcRenderer.invoke('axios.backendLaravel', method, path, data, token)
});

contextBridge.exposeInMainWorld("Toastify", {
  showToast: (options) => Toastify(options).showToast()
});