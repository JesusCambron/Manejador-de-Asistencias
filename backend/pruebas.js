const {regex_password,port} = require("../backend/config/index")
const re = new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
const resp = "Guasave1"

console.log(regex_password);
console.log(port);
console.log(re.toString());
console.log(re.test(resp));