import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import { createUserForMobile, createUserForWeb } from '../services/authService';
import LogModel from '../models/LogModel';
import FunctionLogger from '../libs/Logs.js'


export const signUp = async (req, res) => {
    const logger = new FunctionLogger();
    const { email, password, roles } = req.body;
    try {
        if (req.query.platform == 'mobile') {
            try {
                logger.log('Inicio de signUp en plataforma Mobile')
                const { token, user } = await createUserForMobile(email, password, roles);
                logger.log('Usuario Creado Correctamente')
                return res.status(200).json({ token,user });
            } catch (error) {
                logger.log(`Error en la creacion del usuario ${error.message}`)
                return res.status(400).json({ message: 'Error en la creación del usuario', error: error.message });
            }
        } else if (req.query.platform == 'web') {
            try {
                logger.log('Inicio de signUp en plataforma Web',)
                const { token, user } = await createUserForWeb(email, password, roles);
                logger.log('Usuario Creado Correctamente','signUp')
                return res.status(200).json({ token,user });
            } catch (error) {
                logger.log(`Error en la creacion del usuario ${error.message}`)
                return res.status(400).json({ message: 'Error en la creación del usuario', error: error.message });
            }
        } else {
            logger.log('La plataforma Indicada no es válida')
            return res.status(400).json({ message: 'Plataforma no válida' });
        }
    } catch (error) {
        logger.log(`Error en la creacion del usuario ${error.message}`)
        return res.status(400).json({ message: 'Error en la creación del usuario', error: error.message });
    }
    finally{
        logger.save(logger.getLogs(),'SIGN-UP')
    }
}


export const signIn = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email }).populate("roles");

    if (!userFound) return res.status(400).json({ message: 'User Not found' })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {

    })
    console.log(userFound)
    res.json({ token: token })
}


export const signInAdmin = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");
        console.log(userFound)
        if (!userFound) return res.status(400).json({ message: 'User Not Found' });

        const matchPassword = await User.comparePassword(req.body.password, userFound.password);

        if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid Password' });

        // Verificar si el usuario tiene rol de admin o moderator
        const allowedRoles = ["admin", "moderator"];
        const hasAllowedRole = userFound.roles.some(role => allowedRoles.includes(role.name));

        if (!hasAllowedRole) {
            return res.status(403).json({ message: 'Acceso denegado: No tienes permiso de Admin.' });
        }

        // Generar el token si cumple con los requisitos
        const token = jwt.sign({ id: userFound._id }, config.SECRET, { expiresIn: "1d" });

        res.json({
            token: token,
            userId: userFound._id,
            roles: userFound.roles.map(role => role.name)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};