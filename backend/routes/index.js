const express = require("express");
const routerIndex = express.Router();
const usuarioRouter = require("./usuarios");
const cursosRouter = require("./cursos");
const gruposRouter = require("./grupos");
const alumnosRouter = require("./alumnos");
const archivosRouter = require("./archivos");

routerIndex.use("/usuario", usuarioRouter);
routerIndex.use("/cursos", cursosRouter);
routerIndex.use("/grupos", gruposRouter);
routerIndex.use("/alumnos", alumnosRouter);
routerIndex.use("/archivos", archivosRouter);

module.exports = routerIndex;