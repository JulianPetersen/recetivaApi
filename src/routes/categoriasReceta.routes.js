import { Router } from "express";

const router = Router();
import *as categoriasRecetaCtrl from '../controller/categoriaReceta.controller'
import {authJwt} from '../middlewares'



router.post('/',[authJwt.verifyToken,authJwt.isActiveUser],categoriasRecetaCtrl.createCategoriaReceta)
router.get('/', categoriasRecetaCtrl.getAllCategories);
router.get('/:id',categoriasRecetaCtrl.getCategorieById)
router.delete('/:id',[authJwt.verifyToken,authJwt.isActiveUser], categoriasRecetaCtrl.deleteCategorie)

export default router 