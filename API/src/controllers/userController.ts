import { UserModel } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user';
import { Security } from "../tools/Security";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

exports.signup = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        if (await Security.checkEmail(req.body.email)) {
            res.status(409).json({message: 'Email not unique'})
            return;
        }
        const userModel = new UserModel();
        const hash = await Security.hashPassword(req.body.password);
        const date: number = Math.floor(Date.now() / 1000);
    
        const user: User = {
            email: req.body.email,
            password: String(hash),
            created_at: date,
            id_role: req.body.id_role
        }
    
        userModel.createUser(user, (error, insertId) => {
            if (error) {
                return res.status(500).json({ error });
            }
            return res.status(201).json({ id: insertId });
        });
    } catch (error) {
        res.status(500).json({ error });
        return;
    }
}

exports.login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Vérifier si l'email existe
        if (!await Security.checkEmail(req.body.email)) {
            return res.status(401).json({ message: 'Pas d\'utilisateur trouvé' });
        }

        const userModel = new UserModel();

        // Appeler findUser pour obtenir les résultats
        const results = await userModel.findUser(`email = '${req.body.email}'`, 'id_user, id_role, password');
        if (results.length > 0) {
            const user = results[0];
            
            // Vérifier le mot de passe de manière asynchrone
            const passwordMatches = await Security.checkPassword(req.body.password, user.password);

            if (!passwordMatches) {
                return res.status(401).json({ error: 'Mauvais mot de passe' });
            }

            // Générer le token JWT
            const token = jwt.sign({ userId: user.id_user }, String(process.env.JWT_TOKEN), {
                expiresIn: '24h',
            });

            return res.status(200).json({
                user_id: user.id_user,
                role: user.id_role,
                token,
            });
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur dans la fonction de connexion:', error);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

exports.updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        var hash = "";
        const userModel = new UserModel();

        const result = await userModel.findById(id);

        if (result && result.length > 0) {
            const user = result[0];

            if (req.body.password.length > 0) {
                hash = await Security.hashPassword(req.body.password);
            }

            const updateUser: User = {
                id_user: user.id_user,
                email: req.body.email ? req.body.email : user.email,
                password: hash ? String(hash) : user.password,
                created_at: user.created_at,
                id_role: user.id_role
            } 

            userModel.updateUser(id, updateUser, (error, affectedRows) => {
                if (error) {
                    return res.status(500).json({ error });
                }
                return res.status(201).json({ id: affectedRows });
            })


        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erreur interne du serveur' });    
    }
}