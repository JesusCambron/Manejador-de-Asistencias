const { mongo: { modelosMongoDB: { archivosModel } } } = require("../database/index");

const agregar = async (req, res) => {
    const { idGrupo, unidad, fecha } = req.body;
    const pathDoc = req.file.path;
    const idUsuario = req.params;
    fechaNueva = new Date(fecha);
    const resp = await archivosModel.create({ grupo: idGrupo, unidad, fecha: fechaNueva, usuario: idUsuario.idUsuario, path: pathDoc });
    res.send(resp);
}

const obtenerArchivos = async (req, res) => {
    const { idGrupo,unidad } = req.params;
    const archivos = await archivosModel.find({ $and: [{ grupo: idGrupo }, { unidad }] });
    res.json(archivos)
}

const obtenerArchivo = async (req, res) => {
    const { _id } = req.params;
    const archivos = await archivosModel.find({ _id });

    res.download(archivos[0].path)
}

const fs = require("fs");
const eliminar = async (req, res) => {
    const { _id} = req.params;
    const {path} = req.body
    await archivosModel.deleteOne({ _id });
    try {
        fs.unlinkSync(path);
    } catch (err) {
        return res.status(400).send(err)
    }
    res.send(`Eliminado`);
}

module.exports = {
    agregar,
    obtenerArchivos,
    obtenerArchivo,
    eliminar
}