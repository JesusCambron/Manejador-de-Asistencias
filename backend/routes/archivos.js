const express = require("express");
const router = express.Router();
const {upload} = require("../database")
//const alumnosSchema = require("../schemas/alumnos");
const {validarDatos,validarToken} = require("../middleware/index");
const archivosController = require("../controller/archivos");

router.post("/:idUsuario",validarToken,upload.single("csv"),archivosController.agregar);
router.get("/:idGrupo",validarToken,archivosController.obtenerArchivos);
router.get("/download/:_id",validarToken,archivosController.obtenerArchivo);
router.delete("/:_id",validarToken,archivosController.eliminar);
/* router.get("/download/:idArchivo",validarToken,alumnosController.obtenerAlumnos);
//router.put("/:_id",validarToken,validarDatos(alumnosSchema),alumnosController.modificar);
router.delete("/:_id",validarToken,alumnosController.eliminar);
 */
module.exports = router;