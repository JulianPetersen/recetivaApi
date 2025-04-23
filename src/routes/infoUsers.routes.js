import { Router } from "express";

const router = Router();
import *as infoUsersCtrl from '../controller/infousers.controller'
import {authJwt} from '../middlewares'



router.get('/adminUsers',[authJwt.verifyToken,authJwt.isActiveUser], infoUsersCtrl.getUsersAdmin);
router.get('/adminUsers/:id',[authJwt.verifyToken,authJwt.isActiveUser], infoUsersCtrl.getInfoAdminUserById);
router.put('/adminUsers/:id',[authJwt.verifyToken,authJwt.isActiveUser], infoUsersCtrl.updateDataAdminUser);

router.get('/customuser',[authJwt.verifyToken,authJwt.isActiveUser], infoUsersCtrl.getInfoCustomUser);
router.get('/customuser/:id',[authJwt.verifyToken,authJwt.isActiveUser], infoUsersCtrl.getInfoCustomUserById);
router.put('/customuser/:id',[authJwt.verifyToken,authJwt.isActiveUser], infoUsersCtrl.updateDataCustomUser);
router.delete('/customuser/:id',[authJwt.verifyToken,authJwt.isActiveUser], infoUsersCtrl.deleteCustomUser);

export default router  