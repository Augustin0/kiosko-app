const { app } = require("electron")
const { createWindow } = require("./tools/createWindow")
const { configWindow } = require("./tools/configWindow")
const { readyConfigured } = require("./tools/redyConfigured")
const { commandLine } = require("./tools/startScript")
const { getIp } = require("./tools/getIp")
const { modalError } = require("./tools/errorModal")


const open = () => app.whenReady().then(async () => {
    const { screen } = require("electron"), display = screen.getPrimaryDisplay(),
        { width, height } = display,
        screenSize = { width, height };
    try {
        const ip = (await getIp())
        if (!ip) return modalError()
        const {configured} = readyConfigured();
        const top = configured ? true : false;
        if (!configured) {
            commandLine(`AllowEdgeSwipe.reg`)
            configWindow(screenSize, ip)
        } else createWindow(screenSize, top, ip)
    } catch (error) {
        console.log(error);
    }
})
open()
module.exports.restart = () => {
    app.relaunch()
    open()
}









