import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/change-password', userController.changePassword);
router.post('/reset-password', userController.resetPassword);
router.post('/update-profile', userController.updateProfile);
router.post('/update-avatar', userController.updateAvatar);


export default router;