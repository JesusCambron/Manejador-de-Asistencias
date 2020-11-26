const {mongo:{modelosMongoDB:{alumnosModel}}} = require("../database/index");

const agregar = async(req, res) =>{
    try {
        const {id, nombre, idGrupo} = req.body;
        const {idMaestro} = req.params;
        const alumno = await alumnosModel.find({$and: [{id},{nombre},{idGrupo}]});
        if(alumno.lenght == 0) {
            //find({ $and: [{ idCurso }, { idUsuario }, {nombreGrupo}] });
            await alumnosModel.create({id, nombre, idMaestro ,idGrupo});
            return res.send(`${nombre} ha sido creado`);
        } else {
            return res.status(400).send(`Ya existe el alumno con el mismo nombre o id`);
        }
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
        const {id, nombre,idGrupo} = req.body;
        const {_id} = req.params;
        const registro = await alumnosModel.find({$and: [{id},{nombre},{idGrupo}]});
        if(registro.length == 1) {
            if(registro[0]._id != _id) {
                return res.status(400).send(`Ya existe el alumno con el mismo nombre o id`);
            }
        }
        await alumnosModel.findByIdAndUpdate(_id, {id, nombre});
        return res.send(`${nombre} ha sido actualizado`);    
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