const express = require("express");
const routerIndex = express.Router();
const usuarioRouter = require("./usuarios");
const cursosRouter = require("./cursos");
const gruposRouter = require("./grupos");
const alumnosRouter = require("./alumnos");

routerIndex.use("/usuario", usuarioRouter);
routerIndex.use("/cursos", cursosRouter);
routerIndex.use("/grupos", gruposRouter);
routerIndex.use("/alumnos", alumnosRouter);

module.exports = routerIndex;