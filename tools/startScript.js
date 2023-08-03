const { exec } = require("child_process");

module.exports.commandLine = function commandLine(script) {
    exec(`${script}`, (res, err) => {
        console.log(res,err);
    })
}