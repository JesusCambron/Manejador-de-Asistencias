const moongose = require("mongoose");
const {Schema} = moongose;

const schema = new Schema({
    id:{type:String, unique: true ,required:true},
    nombre:{type:String, required:true},
    idMaestro:{type: Schema.Types.ObjectId, ref:"usuarios"},
    idGrupo:{type: Schema.Types.ObjectId, ref:"grupos"}
}, {timestamps:true})

const model = moongose.model("alumnos", schema);
module.exports = model;