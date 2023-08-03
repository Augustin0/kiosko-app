const fs =require("fs")
const fileDir="./logError.txt"
module.exports.addNewEror=(error)=>{
    if(!fs.existsSync(fileDir))return fs.writeFileSync(fileDir,JSON.stringify(error))
    const writeStream=fs.createWriteStream(fileDir,"utf-8")
     writeStream.write(JSON.stringify(error)+"\n")

}