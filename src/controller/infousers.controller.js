import AdminUser from '../models/AdminUser'
import CustomerUser from '../models/customUser'
import User from '../models/User'



//#region Admin Users
export const getInfoAdminUserById = async (req, res) => { 
    try {
        
        const adminUser = await AdminUser.findById(req.params.id)
        res.json(adminUser);
    } catch (error) {
        await logWorkFlow.createLog()
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

//#endregion


//#region Custom Users
export const getInfoCustomUserById = async (req, res) => { 
    try {
        const customUser = await CustomerUser.findById(req.params.id)
        .populate('user')
        res.json(customUser);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getInfoCustomUser = async (req, res) => { 
    try {
        const customUser = await CustomerUser.find()
        .populate('user')
        res.status(200).json(customUser);
    } catch (error) {
        res.status(400).json(error);
    }
}


export const updateDataCustomUser = async (req,res) => {
    try {
        const updatedUser = await CustomerUser.findByIdAndUpdate(req.params.id,req.body,{
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


export const deleteCustomUser = async (req,res) => {
    try {
        const findUser = await CustomerUser.findById(req.params.id)
        console.log('CONSOLE LOG',findUser)
        const deleteUser = await User.findByIdAndDelete(findUser.user)
        const deletedInfoUser = await CustomerUser.findByIdAndDelete(req.params.id)
        res.status(200).json({
            result:"OK",
            messagge:"usuario eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json(error);
    }
}
//#endregion