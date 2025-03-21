import { Schema, model } from "mongoose";
import appConfig from '../config';
import mongoosePaginate from 'mongoose-paginate-v2';


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
    },
    nutricionista:{
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

recetasSchema.plugin(mongoosePaginate);
export default model('receta', recetasSchema) 
