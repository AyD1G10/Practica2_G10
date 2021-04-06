const fs = require('fs')

const saveUser = (registroData,databaseFile) => {
    if(numberOfUsers(databaseFile) > 0) {
        const usercheck = existsUser(databaseFile,registroData);
        if(usercheck.length > 0) {
          return {msg:"El usuario ya existe",code:0}
        } else {
          const id = generateId(databaseFile);
          registroData.id = id;
          saveRecordToDb(databaseFile,registroData);
          return {msg:"usuario registrado",code:1}
        }
    } else {
        registroData.id = 1;
        saveRecordToDb(databaseFile,registroData);
        return {msg:"usuario registrado",code:1}
    }
}

const generateId = (databaseFile) => {
    const size = databaseFile.database[0].data.length;
    return Number(databaseFile.database[0].data[size-1].id) + 1;
}

const saveRecordToDb = (databaseFile,registroData) => {
    let isSaved = true;
    databaseFile.database[0].data.push(registroData);
    const newData = JSON.stringify(databaseFile)
    fs.writeFile('./database.json',newData,(err) => {
    if(err)
        console.error(err);
        isSaved = false;
    })
    return isSaved;
}

const existsUser = (databaseFile,registroData) => {
    return databaseFile.database[0].data.filter((element) =>{  
        return element.user == registroData.user
    })
}

const numberOfUsers = (databaseFile) => {
    return databaseFile.database[0].data.length
}
module.exports = {generateId,saveRecordToDb,existsUser,numberOfUsers,saveUser}