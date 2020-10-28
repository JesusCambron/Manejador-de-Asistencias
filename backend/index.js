require("dotenv").config();
const database = require("./database");
(async () => {
    await database.mongo.conexionMongoDB.connect();
    require("./server")
    
})();