import { UserModel } from '../models/UserModel';
import { ProfilModel } from '../models/ProfilModel';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/User';
import { Profil } from '../types/Profil';
import { Security } from "../tools/Security";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Folder } from '../tools/Folder';
import { AuthRequest } from '../middlewares/auth'

dotenv.config();

export const signup = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        if (await Security.checkEmail(req.body.email)) {
            res.status(409).json({ message: 'Email not unique' });
            return;
        }

        const userModel: UserModel = new UserModel();
        const profilModel: ProfilModel = new ProfilModel();
        const hash: string = await Security.hashPassword(req.body.password);
        const date: number = Math.floor(Date.now() / 1000);

        const user: User = {
            email: req.body.email,
            password: String(hash),
            created_at: date,
            id_role: req.body.id_role
        };

        userModel.createUser(user, async (error, insertId) => {
            if (error) {
                return res.status(500).json({ error });
            }

            if (!(await Folder.createFolder(String(insertId)))) {
                return res.status(500).json({ message: 'Failed to create user folders' });
            }

            const profil: Profil = {
                actif: 0,
                created_at: date,
                updated_at: date,
                id_user: Number(insertId)
            };

            profilModel.createProfil(profil, (error, insertIdProfil) => {
                if (error) {
                    return res.status(500).json({ error });
                }
                return res.status(201).json({ id: insertIdProfil });
            });
        });

    } catch (error) {
        res.status(500).json({ error });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        if (!await Security.checkEmail(req.body.email)) {
            res.status(401).json({ message: 'Pas d\'utilisateur trouvé' });
            return;
        }

        const userModel = new UserModel();

        const results: User[] = await userModel.findUser(`WHERE email = '${req.body.email}'`, 'id_user, id_role, password');
        if (results.length > 0) {
            const user: User = results[0];
            
            const passwordMatches: boolean = await Security.checkPassword(req.body.password, user.password);

            if (!passwordMatches) {
                res.status(401).json({ error: 'Mauvais mot de passe' });
                return;
            }
 
            const profilModel = new ProfilModel();
            const actifProfil = await profilModel.findById(Number(user.id_user), 'actif');
            const actif  = actifProfil[0].actif;

            const token: string = jwt.sign(
                { 
                    userId: user.id_user,
                    role: user.id_role,
                    actif: actif        
                }, 
                String(process.env.JWT_TOKEN), 
                { expiresIn: '24h' }
            );

            res.status(200).json({
                user_id: user.id_user,
                role: user.id_role,
                actif: actif,
                token,
            });
            return;
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
        return;
    }
};

export const updateUser = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID utilisateur invalide' });
            return;
        }

        if ((id == Number(userId) && actif == '1') || role == '1') {
            const userModel: UserModel = new UserModel();
            const result: User[] = await userModel.findById(id);
    
            if (result && result.length > 0) {
                const user: User = result[0];
                let hash: string = "";
    
                if (req.body.password.length > 0) {
                    hash = await Security.hashPassword(req.body.password);
                }
    
                const updateUser: Partial<User> = {
                    email: req.body.email || user.email,
                    password: hash || user.password,
                } 
    
                userModel.updateUser(id, updateUser, (error, affectedRows) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
                    return res.status(201).json({ id: affectedRows });
                })
                return;
    
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
                return;
            }
        }

        res.status(404).json({message: 'Les ID ne correspondent pas'});
        return;

    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });    
        return;
    }
}

export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID utilisateur invalide' });
            return;
        }

        if ((id == Number(userId)) || role == '1') {
            const userModel = new UserModel();
            const profilModel = new ProfilModel();
            let message;

            const result: User[] = await userModel.findById(id);

            if (result && result.length > 0) {
                Folder.deleteFolder(String(userId))

                const profilDeleted = await new Promise<number>((resolve, reject) => {
                    profilModel.deleteProfil(id, (error, affectedRows) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(affectedRows || 0);
                        }
                    });
                });

                const userDeleted = await new Promise<number>((resolve, reject) => {
                    userModel.deleteUser(id, (error, affectedRows) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(affectedRows || 0);
                        }
                    });
                });
                message = profilDeleted + ' ' + userDeleted;
                res.status(200).json({ message: 'Utilisateur supprimé avec succès ligne affecté => '  + message});
                return;
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
                return;
            }
        }
        res.status(404).json({message: 'Les ID ne correspondent pas'});
        return;

    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
        return;
    }
}