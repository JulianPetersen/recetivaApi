import { Schema, model } from "mongoose";



const logsSchema = new Schema({
    logs:{
        type:String,
        required:false,
    },
    page:{
        type:String
    },
    mail:{
        type:String
    },
    status:{
        type:Number
    }


},
{
    timestamps:true,
    versionKey:false
})

export default model('Logs', logsSchema)