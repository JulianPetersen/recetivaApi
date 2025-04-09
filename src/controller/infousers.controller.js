import AdminUser from '../models/AdminUser'
import CustomerUser from '../models/customUser'
import appConfig from '../config';


export const getInfoAdminUserById = async (req, res) => { 
    try {
        const adminUser = await AdminUser.findById(req.params.id)
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

export const updateDataAdminUser = async (req,res) => {
    try {
        const updatedUser = await AdminUser.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        res.status(201).json({
            result:"ok",
            infoUser:updatedUser
        });
    } catch (error) {
        res.status(400).json(error);
    }
}


export const desactivateUser = async (req,res) => {
    try {
        const desactivateUser = await AdminUser.findByIdAndUpdate(req.params.id, {isActive:req.params.isActive},{
            new:true
        })
        res.status(201).json({
            result:'OK',
            infoUser:desactivateUser
        })
    } catch (error) {
        res.status(400).json(error);
    }
}