import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'
import AdminUser from '../models/AdminUser'

export const signUp = async (req, res) => {
    if (req.query.platform == 'mobile') {
        const { email, password, roles } = req.body;

        const newUser = new User({
            email,
            password: await User.encryptPassword(password)
        })

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: 'user' })
            newUser.roles = [role._id]
        }
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {

        })

        res.status(200).json({ token })
    } else if (req.query.platform == 'web') {
        const { email, password, roles } = req.body;

        const newUser = new User({
            email,
            password: await User.encryptPassword(password)
        })

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: 'moderator' })
            newUser.roles = [role._id]
        }
        const savedUser = await newUser.save();

        const newAdminInfoUser = new AdminUser ({
            user:savedUser._id,
        })
        const savedAdminInfoUser = await newAdminInfoUser.save()

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {

        })

        res.status(200).json({ token })
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