const express = require("express");
const router = express.Router();
const usuarioSchema = require("../schemas/usuarios");
const {validarDatos} = require("../middleware/index");
const usuariosController = require("../controller/usuarios");

router.get("/signIn",usuariosController.signIn);
router.post("/signUp",validarDatos(usuarioSchema),usuariosController.signUp);

module.exports = router;