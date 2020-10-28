const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config");
const validarToken = (req,res,next)=>{
    try {
        const token = req.headers["authorization"];
        const tokenDecodificado = jwt.verify(token,jwtSecret);
        req.userData = tokenDecodificado;
        next();
    } catch (error) {
        res.send("Unauthorized");
    }
}
module.exports = {
    validarToken
}