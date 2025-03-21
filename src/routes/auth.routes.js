import { Router } from "express";
const router = Router();
import * as authCtrl from '../controller/auth.controller'
import {verifySignUp} from '../middlewares'

router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExisted] ,authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
router.post('/signinweb', authCtrl.signInAdmin);

export default router;