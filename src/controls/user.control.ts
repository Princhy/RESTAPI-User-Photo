import { NextFunction, Request, Response } from "express"
import { User } from "../models/user.entity"
import  myDataSource  from "../app-data-source"
import bcrypt from 'bcryptjs';
import { UserService } from "../service/user.Service";



//Select all users
export const getAllUsers = async (req:Request,res:Response)=>{
    const users = await UserService.getAllUsers()
    
    res.json(users);
}

//Select one users
export const getOneUser = async (req:Request,res:Response)=>{
    const user = await UserService.getOneUser(req.params.id)
    if (!user) {
        return res.status(404).send('ID not found');
    }
     res.json(user)
}

//Create new user
export const newUsers =async(req:Request,res:Response, next:NextFunction)=>{

    //HAsher le mpd
    const password_hashed = await bcrypt.hash(req.body.password, 10)

    const user = ({
        ...req.body,
        password : password_hashed
    })
    const results = await UserService.createUser(user)
    return res.send(results)
}

//Update one user
export const updateUser = async (req:Request,res:Response)=>{
    
    //hash mdp 
    const password_hashed = await bcrypt.hash(req.body.password,10)

    const user = ({
        ...req.body,
        password: password_hashed
    })

    const results= await UserService.updateUser(req.params.id,user)

    return res.send(results)
}

//Delete user 
export const deleteUSer = async (req:Request,res:Response)=>{
   const results=await UserService.deleteUser(req.params.id)
    return res.send(results)
}


export const getuserByUSerName = async (req:Request,res:Response)=>{
    try{
        const user_name = String(req.body.user_name)

    const user = await myDataSource.getRepository(User).findOne({
        where: { user_name: user_name}
    })
    return res.json(user)

    }
    catch(error){
        return error
    }
    }


