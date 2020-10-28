const bcrypt = require("bcrypt");
const {salt_rounds} = require("../config");

const getSalt = async()=>{
    return await bcrypt.genSaltSync(Number(salt_rounds));
}

const encriptarPassword = async (password)=>{
    const salt = await getSalt();
    return bcrypt.hashSync(password, salt);
}

const compararPassword = async(passwordFromClient, encryptPassword)=>{
    return await bcrypt.compareSync(passwordFromClient, encryptPassword);
}

module.exports = {
    encriptarPassword,
    compararPassword
}