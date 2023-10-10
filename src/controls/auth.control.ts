import {Request, Response } from "express"
import { UserService } from "../service/user.Service";
import { AuthService } from "../service/auth.Service";


export const AuthController = {
    login: async (req: Request, res: Response) => {
        try {
            const user = await UserService.getOneUserByUsername(req.body.user_name);
            if (!user) {
                return res.status(404).send('User not found');
            }
            if (!AuthService.verifyPassword(req.body.password, user.password)) {
                return res.status(401).send('Invalid credentials');
            }
            const access_token = AuthService.createAccessToken(user);
            const refresh_token = AuthService.createRefreshToken(user);

            res.cookie("refresh_token",refresh_token,{
                secure: true,
                signed: true,
                domain:"localhost",
                httpOnly:true,
                path: '/',
            }).header("Authorization",access_token)
            

            return res.json({access_token, user });
            
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    refreshToken : async (req:Request,res:Response)=>{
        try {
            const refresh_token = req.signedCookies['refresh_token'];

            if (!refresh_token) {
                return res.status(401).json({ msg: 'No token, authorization denied' });
            }

            const user_data = AuthService.verifyToken(refresh_token, process.env.JWT_SECRET);
            const access_token = AuthService.createAccessToken(user_data);

            return res.json({access_token, user: user_data });
            
        } catch (error) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    },

    logout: async (req: Request, res: Response) => {
        try {
            // Supprimez le cookie
            res.clearCookie("refresh_token", {
                secure: true,
                signed: true,
                domain:"localhost",
                httpOnly:true,
                path: '/',
            });

            // Supprimez l'en-tête d'autorisation
            res.header("Authorization", '');

            return res.json({ message: 'User logged out successfully' });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
}