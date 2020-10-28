const express = require("express");
const routerIndex = express.Router();
const usuarioRouter = require("./usuarios");
const cursosRouter = require("./cursos");

routerIndex.use("/usuario", usuarioRouter);
routerIndex.use("/cursos", cursosRouter);

module.exports = routerIndex;