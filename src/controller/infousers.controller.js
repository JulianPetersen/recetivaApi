import AdminUser from '../models/AdminUser'
import CustomerUser from '../models/customUser'
import appConfig from '../config';


export const getInfoAdminUser = async (req, res) => { 
    try {
        const adminUser = await AdminUser.findById(req.params.recetaId)
        
        res.json(adminUser);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getUsersAdmin = async (req,res) => {
    try {
        const adminUsers = await AdminUser.find()
        .populate('user')
        res.json(adminUsers)
    }catch (error){
        res.status(400).json(error);
    }
}