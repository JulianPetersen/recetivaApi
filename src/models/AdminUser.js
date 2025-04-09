import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';


const infoUserAdminSchema = new Schema({
    user:{
        ref: "User",
        type: Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    matricula:{
        type:String,
        required:false,
    },
    isActive:{
        type:Boolean,
        requiered:true,
        default:true
    }

},
{
    timestamps:true,
    versionKey:false
})

export default model('UserAdmin', infoUserAdminSchema)