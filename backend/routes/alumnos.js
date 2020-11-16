const express = require("express");
const router = express.Router();
const alumnosSchema = require("../schemas/alumnos");
const {validarDatos,validarToken} = require("../middleware/index");
const alumnosController = require("../controller/alumnos");

router.post("/:idMaestro",validarToken,validarDatos(alumnosSchema),alumnosController.agregar);
router.get("/:idGrupo",validarToken,alumnosController.obtenerAlumnos);
router.put("/:_id",validarToken,validarDatos(alumnosSchema),alumnosController.modificar);
router.delete("/:_id",validarToken,alumnosController.eliminar);

module.exports = router;