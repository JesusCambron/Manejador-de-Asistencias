const mongoose = require("mongoose");
const {Schema} = mongoose;

const schema = new Schema({
    nombre:{type:String, required: true},
    apellido:{type:String, required: true},
    correo:{type:String, required: true, unique:true},
    password:{type:String, required:true},
    nombreInstitucion:{type:String},
},{timestamps:true});

const model = mongoose.model("usuarios", schema);
module.exports = model;