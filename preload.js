const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld("axios", {
  openAI: (sentence, tools) => ipcRenderer.invoke('axios.openAI', sentence, tools),
  tesseract: (image) => ipcRenderer.invoke('axios.tesseract', image),
  backendLaravelPost: (method, id, data) => ipcRenderer.invoke('axios.backendLaravelPost', method, id, data),
  backendLaravelDelete: (method, id, data) => ipcRenderer.invoke('axios.backendLaravelDelete', method, id, data),
  backendLaravel: (method, path, data, token) => ipcRenderer.invoke('axios.backendLaravel', method, path, data, token)
});

contextBridge.exposeInMainWorld("Toastify", {
  showToast: (options) => Toastify(options).showToast()
});