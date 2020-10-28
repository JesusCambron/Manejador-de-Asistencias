const moongose = require("mongoose");
const {Schema} = moongose;

const schema = new Schema({
    nombre:{type:String, required:true},
    horas:{type:Number},
    unidades:{type:Number, required:true},
    idUsuario: [{type: Schema.Types.ObjectId, ref: "usuarios"}]
}, {timestamps:true})

const model = moongose.model("cursos", schema);
module.exports = model;