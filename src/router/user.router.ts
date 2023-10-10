import { Router } from 'express'
import {deleteUSer, getAllUsers, getOneUser ,getuserByUSerName,newUsers, updateUser } from '../controls/user.control';
import { createNewPhoto, deletePhoto, getAllPhotos, getAllPhotosByUser, getOnePhoto, updatePhoto } from '../controls/photo.control';

import { AuthController } from '../controls/auth.control';
import { authMiddleware } from '../middleware/AuthMiddleware';


const router = Router();

//Routeur user
router.get('/Users',authMiddleware,getAllUsers)

router.get('/User/:id',authMiddleware,getOneUser)

router.post('/User',newUsers)

router.put('/User/:id',authMiddleware,updateUser)

router.delete('/User/:id',authMiddleware,deleteUSer)

router.get('/UserName',authMiddleware, getuserByUSerName)

//routeur photo
router.get('/Photos',authMiddleware,getAllPhotos)

router.get('/PhotoUser/:userId',authMiddleware,getAllPhotosByUser)

router.get('/Photo/:id',authMiddleware,getOnePhoto)

router.post('/Photo',createNewPhoto)

router.put('/Photo/:id',authMiddleware,updatePhoto)

router.delete('/Photo/:id',authMiddleware,deletePhoto)

//Authentitication

router.post('/login', AuthController.login);

router.post('/refresh_token',AuthController.refreshToken)

router.post('/logout', AuthController.logout);

export default router;