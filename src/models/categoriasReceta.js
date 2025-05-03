import { Schema, model } from "mongoose";

const categoriasReceta = new Schema({
    name:{
        type:String
    }

},
{
    timestamps:true,
    versionKey:false
})

export default model('CategoriasReceta', categoriasReceta)