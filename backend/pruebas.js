const {regex_password,port} = require("../backend/config/index")
const re = new RegExp("^(?=.*[a-zA-Z])(?=.*\d)(?=.*)[A-Za-z\d][A-Za-z\d]{7,15}$");
const resp = "Guasave1"

console.log(regex_password);
console.log(port);
console.log(re.toString());
console.log(re.test(resp));