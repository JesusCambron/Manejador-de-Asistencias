const express = require("express");
const router = express.Router();
const gruposSchema = require("../schemas/grupos");
const {validarDatos,validarToken} = require("../middleware/index");
const gruposController = require("../controller/grupos");

router.post("/:idUsuario",validarToken,validarDatos(gruposSchema),gruposController.agregar);
router.get("/:idUsuario",validarToken,gruposController.obtenerGrupos);
router.put("/:_id",validarToken,validarDatos(gruposSchema),gruposController.modificar);
router.delete("/:_id",validarToken,gruposController.eliminar);

module.exports = router;