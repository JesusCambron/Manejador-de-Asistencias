const {mongo:{modelosMongoDB:{cursosModel}}} = require("../database/index");

const agregar = async(req, res) =>{
    try {
        const {nombre, horas, unidades} = req.body;
        const {idUsuario} = req.params;
        const registro = await cursosModel.find({$and: [{nombre}, {idUsuario}]})
        //{ $and: [{ idCurso }, { idUsuario }, {nombreGrupo}] }
        if(registro.length == 0){
            await cursosModel.create({nombre, horas, unidades, idUsuario});
            return res.send(`${nombre} ha sido creado`);
        } else {
            return res.status(400).send(`Ya existe un registro con el nombre ${nombre}`);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const obtenerCursos = async(req, res)=>{
    const {idUsuario} = req.params;
    const cursos = await cursosModel.find({idUsuario});
    res.json(cursos);
}

const modificar = async (req,res)=>{
    try {
        const {nombre, horas, unidades, idUsuario} = req.body;
        const {_id} = req.params;
        console.log(nombre, idUsuario);
        const registro = await cursosModel.find({$and: [{nombre}, {idUsuario}]})
        console.log(registro);
        if(registro.length == 1) {
            if(registro[0]._id != _id) {
                return res.status(400).send(`Ya existe un registro con el nombre ${nombre}`);
            }
        }
        await cursosModel.findByIdAndUpdate(_id, {nombre, horas, unidades,idUsuario});
        return res.send(`${nombre} ha sido actualizado`); 
    } catch (error) {
        res.status(400).send(error);
    }
}

const eliminar = async (req,res) =>{
    const {_id} = req.params;
    await cursosModel.deleteOne({_id});
    res.send(`Eliminado`);
}

module.exports = {
    agregar,
    obtenerCursos,
    modificar,
    eliminar
}