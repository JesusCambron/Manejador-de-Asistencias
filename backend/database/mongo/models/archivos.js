const { date } = require("joi");
const moongose = require("mongoose");
const {Schema} = moongose;

const schema = new Schema({
    grupo: {type: Schema.Types.ObjectId, ref: "grupos"},
    unidad:{type:Number, required:true},
    fecha:{type:Date,required:true},
    usuario:{type: Schema.Types.ObjectId, ref: "usuarios"},
    path: String
}, {timestamps:true})

const model = moongose.model("archivos", schema);
module.exports = model;