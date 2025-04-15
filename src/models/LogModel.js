import { Schema, model } from "mongoose";



const logsSchema = new Schema({
    logs:{
        type:String,
        required:false,
    },
    page:{
        type:String
    }


},
{
    timestamps:true,
    versionKey:false
})

export default model('Logs', logsSchema)