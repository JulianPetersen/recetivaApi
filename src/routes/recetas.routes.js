import { Router } from "express";
import upload from '../middlewares/multer'

const router = Router();
import *as recetaCtrl from '../controller/recetas.controller'
import {authJwt} from '../middlewares'



router.post('/',[authJwt.verifyToken,authJwt.isActiveUser],upload.single('img'),recetaCtrl.createRecetas)
router.get('/', [authJwt.verifyToken,authJwt.isActiveUser],recetaCtrl.getRecetas);
router.get('/allRecetas', recetaCtrl.getAllRecetas)
router.get('/:recetaId',[authJwt.verifyToken,authJwt.isActiveUser],recetaCtrl.getRecetasById);
router.put('/:recetaId',[authJwt.verifyToken,authJwt.isActiveUser], [authJwt.verifyToken],upload.single('img'),recetaCtrl.updateReceta);
router.delete('/:recetaId',[authJwt.verifyToken,authJwt.isActiveUser], [authJwt.verifyToken],recetaCtrl.deleteReceta)


export default router 