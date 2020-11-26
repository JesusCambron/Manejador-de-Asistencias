const {mongo:{modelosMongoDB:{alumnosModel}}} = require("../database/index");

const agregar = async(req, res) =>{
    try {
        const {id, nombre, idGrupo} = req.body;
        const {idMaestro} = req.params;
        const alumno = await alumnosModel.find({idGrupo});
        await alumnosModel.create({id, nombre, idMaestro ,idGrupo});
        res.send(`${nombre} ha sido creado`);
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerAlumnos = async(req, res)=>{
    const {idGrupo} = req.params;
    const alumnos = await alumnosModel.find({idGrupo});
    res.json(alumnos);
}

const modificar = async (req,res)=>{
    try {
        const {id, nombre} = req.body;
        const {_id} = req.params;
        await alumnosModel.findByIdAndUpdate(_id, {id, nombre});
        res.send(`${nombre} ha sido actualizado`);    
    } catch (error) {
        res.status(400).send(error);
    }
}

const eliminar = async (req,res) =>{
    const {_id} = req.params;
    await alumnosModel.deleteOne({_id});
    res.send(`Eliminado`);
}

module.exports = {
    agregar,
    obtenerAlumnos,
    modificar,
    eliminar
}