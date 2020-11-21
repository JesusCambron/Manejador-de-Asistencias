const { mongo: { modelosMongoDB: { gruposModel } } } = require("../database/index");

const agregar = async (req, res) => {
    try {
        const { idCurso, nombreGrupo } = req.body;
        const { idUsuario } = req.params;
        const grupo = await gruposModel.create({ idCurso, idUsuario, nombreGrupo });
        crearCarpeta(grupo);
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

const fs = require("fs");
const crearCarpeta = (grupo) => {
    fs.mkdir(`./database/uploads/${grupo.idUsuario}/${grupo._id}`, (err) => {
        if (err) {
            console.log("Ocurrió un error al crear la carpeta uploads");
        } else {
            console.log("Carpeta uploads creada correctamente");
        }
    })
}

module.exports = {
    agregar,
    obtenerGrupos,
    modificar,
    eliminar
}