const fs = require("fs");
const ipFile = "./url_base.txt"
module.exports.veryfyIP = {
    async getIp() {
        if (!fs.existsSync(ipFile)) {
            fs.writeFileSync(ipFile, "")
            return ""
        } else return  await fs.readFileSync(ipFile, "utf-8")
    },

     saveIp(ip){
       if(!fs.existsSync(ipFile))return fs.writeFileSync(fileDir,error)
       let wstream= fs.createWriteStream(ipFile,"utf-8")
       wstream.write(ip)
       wstream.close()
    }
    

}


