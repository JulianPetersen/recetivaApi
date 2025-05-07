import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import { createUserForMobile, createUserForWeb } from '../services/authService';
import AdminUser from '../models/AdminUser';
import logger from '../libs/logger.js';



export const signUp = async (req, res) => {
    const { email, password, roles } = req.body;
    try {
        if (req.query.platform == 'mobile') {
            try {
                const { token, user } = await createUserForMobile(email, password, roles);
                logger.info(`Usuario creado correctamente con el email ${email} `)
                return res.status(200).json({ token,user });
            } catch (error) {
                logger.error(`Falló en la creación del usuario ${error.message}`)
                return res.status(400).json({ message: 'Error en la creación del usuario', error: error.message });
            }
        } else if (req.query.platform == 'web') {
            try {

                const { token, user } = await createUserForWeb(email, password, roles);
                logger.info(`Usuario creado correctamente con el email ${email} `)
                return res.status(200).json({ token,user });
            } catch (error) {
                logger.error(`Falló en la creación del usuario ${error.message}`)
                return res.status(400).json({ message: 'Error en la creación del usuario', error: error.message });
            }
        } else {

            logger.error(`Plataforma no válida`)
            return res.status(400).json({ message: 'Plataforma no válida' });
        }
    } catch (error) {
        console.log('llegamos al final catch')
        return res.status(400).json({ message: 'Error en la creación del usuario', error: error.message });
    }
}


export const signIn = async (req, res) => {

    const { email, password, roles } = req.body;
    try {

    const userFound = await User.findOne({ email: req.body.email }).populate("roles");
    if (!userFound){
        logger.error(`Usuario ${req.body.email} no encontrado`,{email:req.body.email})
        return res.status(400).json({ message: 'User Not found' })  
    } 

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword){
        logger.error(`La contraseña para el usuario ${req.body.email} no es valida`,{email:req.body.email})
        return res.status(401).json({ token: null, message: 'Invalid Password' })
    } 

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    })

    console.log(userFound)
    logger.info(`sesion para el mail ${req.body.email} iniciada correctamente`,{email:req.body.email})
    res.json({ token: token })
    } catch (error) {
        logger.error(`Algo fallo al querer iniciar sesion con el mail ${req.body.email} ${error.message}`,{email:req.body.email})
        return res.status(400).json({ message: 'Al iniciar Sesion', error: error.message });
    }finally{

    }
    
}


export const signInAdmin = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");
        console.log(userFound)
        if (!userFound){
            logger.error(`Usuario ${req.body.email} no encontrado`,{email:req.body.email})
            return res.status(400).json({ message: 'User Not Found' });
        } 

        const matchPassword = await User.comparePassword(req.body.password, userFound.password);

        if (!matchPassword){
            logger.error(`La contraseña para el usuario ${req.body.email} no es valida`,{email:req.body.email})
            return res.status(401).json({ token: null, message: 'Invalid Password' });
        } 

        // Verificar si el usuario tiene rol de admin o moderator
        const allowedRoles = ["admin", "moderator"];
        const hasAllowedRole = userFound.roles.some(role => allowedRoles.includes(role.name));

        if (!hasAllowedRole) {
            logger.error(`Acceso denegado, no tienes permiso de admin`,{email:req.body.email})
            return res.status(403).json({ message: 'Acceso denegado: No tienes permiso de Admin.' });
        }

        //verificar si el usuario esta activo
        const infoUser = await AdminUser.findOne({user:userFound._id})
        
        if(infoUser.isActive == false){
            logger.error(`tu usuario está desactivado, por favor contacte con administracion para poder revertir la situacion`,{email:req.body.email})
            return res.status(403).json({ message: 'tu usuario está desactivado, por favor contacte con administracion para poder revertir la situacion' });
        }
        
        // Generar el token si cumple con los requisitos
        const token = jwt.sign({ id: userFound._id }, config.SECRET);
        logger.info(`sesion iniciada correctamente`, {email:req.body.email})
        res.json({
            token: token,
            userId: userFound._id,
            roles: userFound.roles.map(role => role.name)
        });
    } catch (error) {
        logger.error(`algo fallo al iniciar sesion ${error.message}`,{email:req.body.email})
        res.status(500).json({ message: 'Server Error' });
    }
};