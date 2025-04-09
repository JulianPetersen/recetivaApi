import { Router } from "express";

const router = Router();
import *as infoUsersCtrl from '../controller/infousers.controller'
import {authJwt} from '../middlewares'



router.get('/adminUsers',[authJwt.verifyToken], infoUsersCtrl.getUsersAdmin);
router.get('/adminUsers/:id',[authJwt.verifyToken], infoUsersCtrl.getInfoAdminUserById);
router.put('/adminUsers/:id',[authJwt.verifyToken], infoUsersCtrl.updateDataAdminUser);


export default router 