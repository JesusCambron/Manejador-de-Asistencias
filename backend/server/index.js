const express = require("express");
const {port} = require("../config");
const routerIndex = require("../routes/index");
const app = express();

app.use(express.json());
app.use("/manejador",routerIndex);

app.listen(port,()=>{
    console.log(`Servidor iniciado en puerto ${port}`);
})