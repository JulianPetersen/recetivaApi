import { Schema, model } from "mongoose";
import appConfig from '../config';

const recetasSchema = new Schema({
   
    title:{
        type:String
    },
    img: {
        type: String
     },
    arrayIngredientes:{
        type:[String]
    },
    instrucciones:{
        type:String
    }

},
{
    versionKey:false
})

recetasSchema.methods.setImgUrl = function setImgUrl (filename){
    const {host, port} = appConfig
    this.img = `${host}/public/${filename}`
}

export default model('receta', recetasSchema) 
