const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld("axios", {
  openAI: (sentence, tools) => ipcRenderer.invoke('axios.openAI', sentence, tools),
  tesseract: (image) => ipcRenderer.invoke('axios.tesseract', image),
  // supaBase: (method, id, data) => ipcRenderer.invoke('axios.supaBase', method, id, data),
  backendLaravelPost: (method, id, data) => ipcRenderer.invoke('axios.backendLaravelPost', method, id, data),
  //backendLaravelPost: (method, path, data, token) => ipcRenderer.invoke('axios.backendLaravelPost', method, path, data, token),
  backendLaravel: (method, path, data, token) => ipcRenderer.invoke('axios.backendLaravel', method, path, data, token)
});

contextBridge.exposeInMainWorld("Toastify", {
  showToast: (options) => Toastify(options).showToast()
});