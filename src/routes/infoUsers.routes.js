import { Router } from "express";

const router = Router();
import *as infoUsersCtrl from '../controller/infousers.controller'
import {authJwt} from '../middlewares'



router.get('/adminUsers',[authJwt.verifyToken], infoUsersCtrl.getUsersAdmin);



export default router 