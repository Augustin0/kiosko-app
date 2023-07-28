const fs = require("fs");
const ipFile = "./url_base.txt"

module.exports.getIp = async function getIp() {
    let data
    if (!fs.existsSync(ipFile)) {
        fs.writeFileSync(ipFile, "")
        return ""
    } else data = await fs.readFileSync(ipFile, "utf-8")
    return data
}