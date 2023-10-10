import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../service/auth.Service';

interface RequestWithUser extends Request {
    user: any
}

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const access_token = req.headers['Authorization'];
        
        if (!access_token) {
            
            const refresh_token = req.signedCookies['refresh_token'];

            if (!refresh_token) {
                return res.status(401).json({ msg: 'No token, authorization denied' });
            }

            const user_data = jwt.verify(refresh_token, process.env.JWT_SECRET);
            const access_token = AuthService.createAccessToken(user_data);

            // Mettre à jour le user dans la requête avec les données de l'utilisateur
            req.user = user_data;
            
            
        } else {
            jwt.verify(access_token, process.env.JWT_SECRET);
            
        }

        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
