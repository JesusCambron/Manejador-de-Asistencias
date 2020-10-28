const express = require("express");
const router = express.Router();
const cursoSchema = require("../schemas/cursos");
const {validarDatos,validarToken} = require("../middleware/index");
const cursosController = require("../controller/cursos");

router.post("/:idUsuario",validarToken,validarDatos(cursoSchema),cursosController.agregar);
router.get("/:idUsuario",validarToken,cursosController.obtenerCursos);
router.put("/:_id",validarToken,validarDatos(cursoSchema),cursosController.modificar);
router.delete("/:_id",validarToken,cursosController.eliminar);

module.exports = router;