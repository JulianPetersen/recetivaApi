import User from '../models/User'
import Role from '../models/Role'
import AdminUser from '../models/AdminUser'
import jwt from 'jsonwebtoken';
import config from '../config'



const createUserForMobile = async (email, password, roles) => {
    const newUser = new User({
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: 'user' });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, config.SECRET);
    return { token, user: savedUser };
};


const createUserForWeb = async (email, password, roles) => {
    const newUser = new User({
        email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: 'moderator' });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    // Crear la entrada adicional para AdminUser (web platform specific logic)
    const newAdminInfoUser = new AdminUser({
        user: savedUser._id,
    });
    await newAdminInfoUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.SECRET);
    return { token, user: savedUser };
};

module.exports = {
    createUserForMobile,
    createUserForWeb
};

