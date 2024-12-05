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
                            status: AmitieStatus.Pending,
                            ask: id_profil
                        };

                        const newAmitie_2: Amitie = {
                            id_profil: id_profil_1,
                            id_profil_1: id_profil,
                            status: AmitieStatus.Pending,
                            ask: id_profil
                        }
                        const f1 = await new Promise<number>((resolve, reject) => {
                            amitieModel.createAmitie(newAmitie, (error, insertId) => {
                                if (error) {
                                    reject(error)
                                }
                                resolve(insertId!);
                            });
                        })

                        const f2 = await new Promise<number>((resolve, reject) => {
                            amitieModel.createAmitie(newAmitie_2, (error, insertId) => {
                                if (error) {
                                    reject(error)
                                }
                                resolve(insertId!);
                            });
                        });
                        return  res.status(201).json({message: f1 + " " + f2});
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

    static async updateAmitie (req: AuthRequest, res: Response, next: NextFunction) : Promise<void | any> {
        try {
            const { userId, role, actif } = req.auth || {};
            const idAmitie: number = Number(req.params.idAmitie);
            const slugBody: string = req.body.slug; 
            const amitieModel: AmitieModel = new AmitieModel();
    
            
            if (isNaN(idAmitie)) {
                return res.status(400).json({ error: 'ID invalide' });
            }
            
            if (!Object.values(AmitieStatus).includes(slugBody as AmitieStatus)) {
                return res.status(400).json({ message: "Statut invalide." });
            }
            
            if (actif != '1') {
                return res.status(400).json({message: 'Compte pas actif'});
            }

            const amitieFind: Array<Amitie> = await amitieModel.findById(idAmitie);
            
            if (amitieFind.length == 0) {
                return res.status(404).json({error: "Pas de demande trouvé"});
            }
            const amitieFind_2: Array<Amitie> = await amitieModel.findAmitie(`WHERE id_profil=${amitieFind[0].id_profil_1} AND id_profil_1=${amitieFind[0].id_profil}`);

            if (amitieFind_2.length == 0) {
                return res.status(404).json({error: "Autre demande pas trouvé"});
            }
            
            switch (slugBody as AmitieStatus) {
                case AmitieStatus.Accepted :                           
                    const updateAmitie: Partial<Amitie> = {
                        status: AmitieStatus.Accepted
                    } 
                    if (typeof amitieFind_2[0].id_amitie != 'undefined') {
                        const f1 = await new Promise<number>((resolve, reject) => {
                            amitieModel.updateAmitie(idAmitie, updateAmitie, (error, affectedRows) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(affectedRows!)
                                }
                            });
                        });
                        const idFriend: number = amitieFind_2[0].id_amitie;
                        const f2 = await new Promise<number>((resolve, reject) => {
                            amitieModel.updateAmitie(idFriend, updateAmitie, (error, affectedRows) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(affectedRows!)
                                }
                            });
                        });
                        
                        res.status(200).json({message: f1 + ' ' + f2})
                    }
                    break;

                case AmitieStatus.Rejected:
                    if (typeof amitieFind_2[0].id_amitie != 'undefined') {
                        const idFriend: number = amitieFind_2[0].id_amitie;
                        var message: string;
                        const amitieDelete = await new Promise<number>((resolve, reject) => {
                            amitieModel.deleteAmitie(idAmitie, (error, affectedRows) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(affectedRows || 0);
                                }
                            });
                        });

                        const amitieDelete_2 = await new Promise<number>((resolve, reject) => {
                            amitieModel.deleteAmitie(idFriend, (error, affectedRows) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(affectedRows || 0);
                                }
                            });
                        });
    
                        message = amitieDelete + " " + amitieDelete_2;
                        res.status(200).json({ message: 'amitie supprimé avec succès ligne affecté => '  + message});
                    }
                    break;
                default: 
                    res.status(400).json({error: 'Slug non reconnu'});
                    break;
            }        
            
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });    
        }
    }

    static async getAmitieWithProfil (req: AuthRequest, res: Response, next: NextFunction) : Promise<void | any> {
        try {           
            const { userId, role, actif } = req.auth || {};
            const id: number = Number(req.params.id);
            const slug: string = req.params.slug; 
            const amitieModel: AmitieModel = new AmitieModel();

            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID invalide' });
            }
    
            if (!Object.values(AmitieStatus).includes(slug as AmitieStatus)) {
                return res.status(400).json({ message: "Statut invalide." });
            }
    
            if (actif != '1') {
                return res.status(400).json({message: 'Compte pas actif'});
            }      
            
            const queryString: string = `SELECT a.id_amitie, a.id_profil, a.id_profil_1, a.status, a.ask, p.nom, p.prenom, p.img_profil FROM cx__amitie AS a JOIN cx__profil AS p ON p.id_profil = a.id_profil_1 WHERE a.id_profil = ${id} AND a.status = "${slug}";`
            switch (slug as AmitieStatus) {
                case AmitieStatus.Accepted :
                    const amitiesAccepted: Array<Amitie> = await amitieModel.findAmitie(``, '',queryString);
                    res.status(200).json(amitiesAccepted);
                    break;
                case AmitieStatus.Pending :
                    const amitiePending: Array<Amitie> = await amitieModel.findAmitie(``, '', queryString);
                    res.status(200).json(amitiePending);
                    break;
                default : 
                    res.status(400).json({error: "Pas le bon slug"});
                    break;
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });
            return;
        }
    }

    static async getOneAmitie (req: AuthRequest, res: Response, next: NextFunction) : Promise<void | any> {
        try {
            const { userId, role, actif } = req.auth || {};
            const id: number = Number(req.params.id);
            const amitieModel: AmitieModel = new AmitieModel();
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID invalide' });
            }
    
            if (actif != '1') {
                return res.status(400).json({message: 'Compte pas actif'});
            }   
            const queryString: string = `SELECT a.id_amitie, a.id_profil, a.id_profil_1, a.status, a.ask, p.nom, p.prenom, p.img_profil FROM cx__amitie AS a JOIN cx__profil AS p ON p.id_profil = a.id_profil_1 WHERE a.id_amitie = ${id};`

            const amitieFind: Array<Amitie> = await amitieModel.findAmitie("", "", queryString);

            if (amitieFind.length == 0) {
                return res.status(400).json({error: "Rien trouvé"});
            }
            
            return res.status(200).json(amitieFind);
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    static async deleteAmitie (req: AuthRequest, res: Response, next: NextFunction) : Promise<void | any> {
        try {
            const { actif } = req.auth || {};
            const id: number = Number(req.params.id);
            let message;
            const amitieModel: AmitieModel = new AmitieModel();
    
            if (isNaN(id)) {
                return res.status(400).json({ error: ' ID pas invalide' });
                
            }
    
            if (actif != "1") {
                return res.status(401).json({error : "Unauthorize"})
            }

            const result: Array<Amitie> = await amitieModel.findById(id);
    
            if (result && result.length == 0) {
                return res.status(404).json({ error: 'commentaire non trouvé' });
            };

            const amitieFind_2: Array<Amitie> = await amitieModel.findAmitie(`WHERE id_profil=${result[0].id_profil_1} AND id_profil_1=${result[0].id_profil}`);

            if (amitieFind_2.length == 0) {
                return res.status(404).json({error: "Autre demande pas trouvé"});
            }

            if (typeof amitieFind_2[0].id_amitie != 'undefined') {
                const idFriend: number = amitieFind_2[0].id_amitie;
                const amitieDelete = await new Promise<number>((resolve, reject) => {
                    amitieModel.deleteAmitie(id, (error, affectedRows) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(affectedRows || 0);
                        }
                    });
                });

                const amitieDelete_2 = await new Promise<number>((resolve, reject) => {
                    amitieModel.deleteAmitie(idFriend, (error, affectedRows) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(affectedRows || 0);
                        }
                    });
                });

                message = amitieDelete + " " + amitieDelete_2;
            }

            res.status(200).json({ message: 'amitie supprimé avec succès ligne affecté => '  + message});
            return;
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
            
        }
    }
}