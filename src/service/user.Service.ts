import { User } from "../models/user.entity";
import myDataSource from "../app-data-source";

export const UserService = {
    getAllUsers: async () => {
        try {
            const users = await myDataSource.getRepository(User).find();
            return users;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des utilisateurs : ${error.message}`);
        }
    },

    getOneUser: async (id) => {
        return await myDataSource.getRepository(User).findOneBy({id});
    },

    getOneUserByUsername: async (user_name) => {
        try{
            const user = await myDataSource.getRepository(User).findOne({ where: { user_name } });
            return user;
        }
        catch(error){
            throw new Error(`Erreur lors de la récupération des utilisateurs : ${error.message}`);
        }
    },

    createUser: async (userData) => {
        const user = await myDataSource.getRepository(User).create(userData);
        return await myDataSource.getRepository(User).save(user);
    },

    updateUser: async (id, userData) => {
        const user = await myDataSource.getRepository(User).findOneBy({ id: Number(id) });
        if (!user) {
            throw new Error('User not found');
        }
        myDataSource.getRepository(User).merge(user, userData);
        return await myDataSource.getRepository(User).save(user);
    },

    deleteUser: async (id) => {
        const user = await myDataSource.getRepository(User).findOneBy({ id: Number(id) });
        if (!user) {
            throw new Error('User not found');
        }
        return await myDataSource.getRepository(User).delete({ id: Number(id) });
    }
}
