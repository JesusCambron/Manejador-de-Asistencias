require("dotenv").config();
const fs = require("fs");
const database = require("./database");
(async () => {
    //Crea la carpeta uploads donde se guardan los archivos
    fs.mkdir("./database/uploads", (err)=>{
        if(err){
            console.log("Ocurrió un error al crear la carpeta uploads");
        } else {
            console.log("Carpeta uploads creada correctamente");
        }
    })
    await database.mongo.conexionMongoDB.connect();
    require("./server")
    
})();

