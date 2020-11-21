const moongose = require("mongoose");
const {Schema} = moongose;

const schema = new Schema({
    idCurso: {type: Schema.Types.ObjectId, ref: "cursos"},
    idUsuario: {type: Schema.Types.ObjectId, ref: "usuarios"},
    nombreGrupo:{type:String, unique: true ,required:true},
    //alumnos:[{type: Schema.Types.ObjectId, ref: "alumnos"}]
}, {timestamps:true})

const model = moongose.model("grupos", schema);
module.exports = model;