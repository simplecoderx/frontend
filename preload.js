const { contextBridge, ipcRenderer  } = require('electron')
const Toastify = require('toastify-js');
// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   // we can also expose variables, not just functions
// })

contextBridge.exposeInMainWorld("axios", {
  openAI: (sentence) => ipcRenderer.invoke('axios.openAI', sentence)
});
contextBridge.exposeInMainWorld("Toastify", {
  showToast: (options) => Toastify(options).showToast()
});