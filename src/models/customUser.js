import { Schema, model } from "mongoose";

const infoCustomUser = new Schema({
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

},
{
    timestamps:true,
    versionKey:false
})

export default model('UserCustom', infoCustomUser)