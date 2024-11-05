import { AmitieModel } from "../models/AmitieModel";
import { ProfilModel } from "../models/ProfilModel";
import { Request, Response, NextFunction } from 'express';
import { Amitie } from '../types/Amitie';
import { Profil } from '../types/Profil';
import { AuthRequest } from '../middlewares/auth';
import { AmitieStatus } from "../types/StatusEnum";


export class AmitieController {
    static async createAmitie (req: AuthRequest, res: Response, next: NextFunction) : Promise<void | any> {
        try {
            const { userId, actif } = req.auth || {};
            const { id_profil, id_profil_1 } = req.body;

            if (id_profil === id_profil_1) {
                return res.status(400).json({ message: "Les profils doivent être différents." });
            }
            if (actif == '1' && userId === id_profil) {
                const profilModel: ProfilModel = new ProfilModel();
                
                const profil_1: Profil[] = await profilModel.findById(id_profil_1);
                
                
                if (profil_1 && profil_1.length > 0) {
                    const friend: Profil =  profil_1[0];                    
                    
                    if (friend.actif == 1) {                        
                        const amitieModel: AmitieModel = new AmitieModel();

                        const amitieFind: Array<Amitie> = await amitieModel.findAmitie(`WHERE id_profil=${id_profil} AND id_profil_1=${friend.id_profil}`);

                        if (amitieFind && amitieFind.length > 0) {
                            return res.status(400).json({error: 'Déja en attente'});
                        }
                        const newAmitie: Amitie = {
                            id_profil,
                            id_profil_1,
                            status: AmitieStatus.Pending
                        };
                        amitieModel.createAmitie(newAmitie, (error, insertId) => {
                            if (error) {
                                return res.status(500).json({ error });
                            }
                            return res.status(201).json({ id: insertId });
                        });
                        return ;
                    }
                    return res.status(404).json({error : 'Compte ami pas actif'});
                } 
                return res.status(400).json({error: "Profil_1 pas trouvé"})
            }
            return res.status(404).json({error: 'Compte pas actif'})
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    static async updateAmitie (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {}

    static async getAmitie (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {}

    static async deleteAmitie (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {}
}

export const createAmitie = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, actif } = req.auth || {};
        const { id_profil, id_profil_1 } = req.body;
        console.log(userId + " " + id_profil);
        

        if (actif == '1' && userId === id_profil) {
            
            
            if (id_profil === id_profil_1) {
                res.status(400).json({ message: "Les profils doivent être différents." });
                return;
            }
            const profilModel: ProfilModel = new ProfilModel();
            
            const profil_1: Profil[] = await profilModel.findById(id_profil_1);
            console.log(profil_1);
            
            
          
        }
        res.status(404).json({error: 'Compte pas actif ici'})
        return;
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
        return;
    }
}

export const updateAmitie = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const idAmitie: number = Number(req.params.id);

        if (isNaN(idAmitie)) {
            res.status(400).json({ error: 'ID invalide' });
            return;
        }

        if (!Object.values(AmitieStatus).includes(req.body.status)) {
            res.status(400).json({ message: "Statut invalide." });
            return;
        }

        if (actif == '1') {
            const amitieModel: AmitieModel = new AmitieModel();
            const result: Amitie[] = await amitieModel.findById(idAmitie);
    
            if (result && result.length > 0) {

                const updateAmitie: Partial<Amitie> = {
                    status: req.body.status
                } 

    
                amitieModel.updateAmitie(idAmitie, updateAmitie, (error, affectedRows) => {
                    if (error) {
                        return res.status(500).json({ error });
                    }
                    return res.status(201).json({ id: affectedRows });
                })
                return;
    
            } else {
                res.status(404).json({ error: 'Amitie non trouvé' });
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

export const getAmitie = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, actif } = req.auth || {};

        if (actif == '1') {
            const amitieModel: AmitieModel = new AmitieModel();
            const status = req.query.status as string;

            if (status && !Object.values(AmitieStatus).includes(status as AmitieStatus)) {
                res.status(400).json({ message: "Statut invalide." });
                return;
            }

            const amities = await amitieModel.findAmitie(`WHERE id_profil = ${userId} AND status = ${status}`);
    
            res.status(200).json(amities);
        }
        res.status(401).json({error: "Compte pas actif"})
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
        return;
    }
}

export const deleteAmitie = async (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { userId, role, actif } = req.auth || {};
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: ' ID pas invalide' });
            return;
        }

        if (actif == "1") {
            const amitieModel: AmitieModel = new AmitieModel();
            let message;

            const result: Amitie[] = await amitieModel.findById(id);

            if (result && result.length > 0) {

                const amitie: Amitie = result[0];
                
                if (amitie.id_profil == Number(userId)) {

                    const amitieDelete = await new Promise<number>((resolve, reject) => {
                        amitieModel.deleteAmitie(id, (error, affectedRows) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(affectedRows || 0);
                            }
                        });
                    });

                    message = amitieDelete;
                    res.status(200).json({ message: 'amitie supprimé avec succès ligne affecté => '  + message});
                    return;
                } else {
                    res.status(401).json({error : "Unauthorize"})
                    return;
                }
            } else {
                res.status(404).json({ error: 'commentaire non trouvé' });
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