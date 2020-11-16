const { mongo: { modelosMongoDB: { gruposModel } } } = require("../database/index");

const agregar = async (req, res) => {
    try {
        const { idCurso, nombreGrupo } = req.body;
        const { idUsuario } = req.params;
        await gruposModel.create({ idCurso, idUsuario, nombreGrupo });
        res.send(`${nombreGrupo} ha sido creado`);
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerGrupos = async (req, res) => {
    const { idUsuario } = req.params;
    const grupos = await gruposModel.find({ idUsuario }).populate("idCurso");
    res.json(grupos);
}

const modificar = async (req, res) => {
    try {
        const { idCurso, nombreGrupo } = req.body;
        const { _id } = req.params;
        await gruposModel.findByIdAndUpdate(_id, { idCurso, nombreGrupo });
        res.send(`${nombreGrupo} ha sido actualizado`);
    } catch (error) {
        res.status(400).send(error);
    }
}

const eliminar = async (req, res) => {
    const { _id } = req.params;
    const resp = await gruposModel.deleteOne({ _id });
    if (resp.deletedCount === 0) {
        res.status(400).send("Error al eliminar");
    } else {
        res.send(`Eliminado`);
    }
}

module.exports = {
    agregar,
    obtenerGrupos,
    modificar,
    eliminar
}