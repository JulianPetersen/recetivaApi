import AdminUser from '../models/AdminUser'
import CustomerUser from '../models/customUser'
import User from '../models/User'



//#region Admin Users
export const getInfoAdminUserById = async (req, res) => { 
    try {
        const adminUser = await AdminUser.findById(req.params.id)
        res.json(adminUser);
    } catch (error) {
        
        res.status(400).json(error);
    }
}

export const getInfoAdminUserByUserId = async (req,res) => {
    try{
        const adminUser = await AdminUser.findOne({user:req.params.userId})
        res.status(200).json(adminUser)
        
    }catch{
        res.status(400).json(error)
    }
}

export const getUsersAdmin = async (req,res) => {
    try {
        console.log('EL BODY ES',req.body)
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


export const searchUserByMail = async (req,res) => {
    try {
        const emailFragment = req.query.email 
    
        if (!emailFragment) {
          return res.status(400).json({ message: 'El fragmento de email es requerido' });
        }
    
        const regex = new RegExp('^' + emailFragment, 'i');
    
        // Buscamos adminUsers y populamos el campo user
        const users = await AdminUser.find()
          .populate({
            path: 'user',
            match: { email: regex }, // Acá es donde aplicamos el filtro
          })
          .exec();
    
        // Filtrar solo los que efectivamente tienen user (porque los demás no hicieron match)
        const filteredUsers = users.filter(u => u.user !== null);
    
        if (filteredUsers.length === 0) {
            return res.json(filteredUsers);
        }
    
        res.json(filteredUsers);
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ message: 'Error del servidor' });
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


export const getAllUsers = async (req,res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json(error);
    }
}
//#endregion