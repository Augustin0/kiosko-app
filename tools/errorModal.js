const { BrowserWindow, } = require("electron")
const { join } = require("path")
const { veryfyIP } = require("./verifyIP")


const icon = (join(__dirname, "../assets/icon.ico"))
const title = "medturn-kiosko"
let start = require("../main")

module.exports.modalError = () => {
    const win = new BrowserWindow({
        center: true,
        icon,
        title
    })

    win.setMenu(null)
    win.loadFile(join(__dirname, "../pages/errorPage.html"))
    win.center()
    win.webContents.on("did-finish-load", () => {
        win.webContents.on("console-message", (res, _, data) => {
            let _data = data.split(":");
            if (_data && _data[0] === "url") {
                veryfyIP.saveIp(_data[1])
                    win.close()
                    start.restart()
            }
        })
    })
}