import  jwt, { decode }  from "jsonwebtoken"
import config  from "../config"
import User from "../models/User"
import Role from '../models/Role'
import InfoUserADmin from '../models/AdminUser'
import logger from '../libs/logger.js';

export const verifyToken = async (req,res,next)=> {
    
    try {
        const token =  req.headers["x-access-token"]
        console.log(token)
   
    if(!token) return res.status(403).json({message:"no token provider"})

    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id
 
    const  user = await User.findById(req.userId, {password:0});
    if(!user) return res.status(404).json({message:'No existe el usuario'})

    next()
    } catch (error) {
        return res.status(401).json({message:"no esta autorizado"})
    }
}

export const isModerator = async (req,res, next) => {
     const user = await User.findById(req.userId)
     const roles =  await Role.find({_id: {$in: user.roles}})

    for(let i = 0; i < roles.length; i++){
        if (roles[i].name === "moderator"){
            next()
            return;
        }
    }
  
    return res.status(403).json({message: "requiere Rol de moderador"})
}


export const isActiveUser = async (req,res,next) => {
    const user = await User.findById(req.userId)
    console.log('EL USER ID ES',req.userId)
    const userInfo = await InfoUserADmin.findOne({user:user})
    // console.log('IS ACTIVE USER MIDDLEWAREw',userInfo)
    if(userInfo.isActive == true){
        next()
        return
    }
        
    return res.status(403).json({message: "Su Usuario está desacrivado, debe comunicarse con admiistracion para solucionar el problema"})
}


export const isAdmin = async (req,res, next) => {
    const user = await User.findById(req.userId)
    console.log('EL USUARIO ES', user)
    const roles =  await Role.find({_id: {$in: user.roles}})

   for(let i = 0; i < roles.length; i++){
       if (roles[i].name === "admin"){
           next()
           return;
       }
   }
   logger.error(`requiere rol administrador`,{email:user.email})
    return res.status(403).json({message: "requiere Rol de administrador"})
}