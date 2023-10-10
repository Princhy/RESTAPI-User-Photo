import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const AuthService = {
    hashPassword: (password) => {
        return bcrypt.hashSync(password, 10);
    },

    verifyPassword: (password, hashedPassword) => {
        return bcrypt.compareSync(password, hashedPassword);
    },

    createAccessToken: (user) => {
        return jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '15m' });
    },
    createRefreshToken :(user) =>{
        return jwt.sign({user:user}, process.env.JWT_SECRET, {expiresIn:'1d'});
    },

    verifyToken: (token,secret_key) => {
        try {
            return jwt.verify(token, secret_key);
        } catch (error) {
            return null;
        }
    }
}
