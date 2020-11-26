const { mongo: { modelosMongoDB: { archivosModel } } } = require("../database/index");

const agregar = async (req, res) => {
    const { idGrupo, unidad, fecha } = req.body;
    const pathDoc = req.file.path;
    const idUsuario = req.params;
    fechaNueva = new Date(fecha);
    const registro = await archivosModel.find({$and: [{grupo: idGrupo},{unidad},{fecha: fechaNueva}]})
    if(registro.length == 0) {
        const resp = await archivosModel.create({ grupo: idGrupo, unidad, fecha: fechaNueva, usuario: idUsuario.idUsuario, path: pathDoc });
        return res.send(resp);
    } else {
        return res.status(400).send(`Ya existe un registro en esta fecha`);
    }
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