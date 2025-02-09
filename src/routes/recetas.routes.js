import { Router } from "express";
import upload from '../middlewares/multer'

const router = Router();
import *as recetaCtrl from '../controller/recetas.controller'
import {authJwt} from '../middlewares'



router.post('/',[authJwt.verifyToken, authJwt.isAdmin],upload.single('img'),recetaCtrl.createRecetas)
router.get('/', recetaCtrl.getRecetas);
router.get('/:recetaId',recetaCtrl.getRecetasById);
router.put('/:recetaId', [authJwt.verifyToken, authJwt.isAdmin],upload.single('img'),recetaCtrl.updateReceta);
router.delete('/:recetaId', [authJwt.verifyToken, authJwt.isAdmin],recetaCtrl.deletePartido)


export default router 