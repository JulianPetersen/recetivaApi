import User from '../models/User'
import AdminUser from '../models/AdminUser'
import config from '../config'
import logger from '../libs/logger'


const checkInfoUser = async (userId) => {
    let user = await User.findById(userId); // ← agregamos await
    let userInfo = await AdminUser.findOne({ user: userId });
    if (!userInfo || userInfo.name == undefined || userInfo.lastName == undefined || userInfo.matricula == undefined) {
        logger.error('Debes rellenar tus datos antes de publicar una receta, ve a mi cuenta, modificar mis datos.', { email: user?.email || 'sin-email' })
        return false;
    }

    return true;
}

module.exports = {
    checkInfoUser
};
