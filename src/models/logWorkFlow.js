import { Schema, model } from "mongoose";


const logWorkFlow = new Schema({
    userEmail:{
        type:String
    },
    messagge:{
        type:String
    },
    page:{
        type:String
    },
    status:{
        type:String
    }
},
{
    versionKey:false
})

export default model('logWorkFlow', logWorkFlow)