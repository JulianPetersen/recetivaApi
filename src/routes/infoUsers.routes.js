import { Router } from "express";

const router = Router();
import *as infoUsersCtrl from '../controller/infousers.controller'
import {authJwt} from '../middlewares'



router.get('/adminUsers',[authJwt.verifyToken], infoUsersCtrl.getUsersAdmin);
router.get('/adminUsers/:id',[authJwt.verifyToken], infoUsersCtrl.getInfoAdminUserById);
router.put('/adminUsers/:id',[authJwt.verifyToken], infoUsersCtrl.updateDataAdminUser);

router.get('/customuser',[authJwt.verifyToken], infoUsersCtrl.getInfoCustomUser);
router.get('/customuser/:id',[authJwt.verifyToken], infoUsersCtrl.getInfoCustomUserById);
router.put('/customuser/:id',[authJwt.verifyToken], infoUsersCtrl.updateDataCustomUser);
router.delete('/customuser/:id',[authJwt.verifyToken], infoUsersCtrl.deleteCustomUser);

export default router  