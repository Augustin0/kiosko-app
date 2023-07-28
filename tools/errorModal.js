const { BrowserWindow } = require("electron")
const path = require("path")
module.exports.modalError = (message) => {
    const win = new BrowserWindow({
        center: true
    })
    win.setMenu(null)
    win.loadFile(path.join(__dirname, "../pages/errorPage.html"))
    win.center()
    setTimeout(() => {
        win.close()
    }, 120000);
}