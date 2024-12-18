import { ProfilModel } from "../models/ProfilModel";
import { Request, Response, NextFunction } from 'express';
import { Profil } from '../types/Profil';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { AuthRequest } from '../middlewares/auth'

dotenv.config();

export class ProfilController {
    static async updateProfil (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { userId, role, actif } = req.auth || {};
            const id: number = Number(req.params.id);
    
            if (isNaN(id)) {
                res.status(400).json({ error: 'ID utilisateur invalide' });
                return;
            }
    
            if ((id == Number(userId)) || role == '1') {
                const profilModel: ProfilModel = new ProfilModel();
                const result: Profil[] = await profilModel.findById(id);
        
                if (result && result.length > 0) {
                    const date: number = Math.floor(Date.now() / 1000);
                    const profil: Profil = result[0];
    
                    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
                    if (files?.profil) {
                        const oldImagePath = path.join(__dirname, '../img/imgProfil/', String(id), 'profil', String(profil.img_profil));
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
    
                    if (files?.bg) {
                        const oldBgPath = path.join(__dirname, '../img/imgProfil/', String(id), 'bg',  String(profil.img_bg));
                        if (fs.existsSync(oldBgPath)) {
                            fs.unlinkSync(oldBgPath);
                        }
                    }
                   
                    const updateProfil: Partial<Profil> = {
                        nom: req.body.lastName || profil.nom,
                        prenom: req.body.firstName || profil.prenom,
                        date_naissance: Number(req.body.date) || profil.date_naissance,
                        img_profil: files?.profil  ? String(files?.profil[0].path.split('\\').at(-1)) : profil.img_profil,
                        img_bg: files?.bg ? String(files?.bg[0].path.split('\\').at(-1)) : profil.img_bg,
                        ville: req.body.city || profil.ville,
                        description: req.body.content || profil.description,
                        actif: 1,
                        updated_at: date
                    }                 
        
                    profilModel.updateProfil(id, updateProfil, (error, affectedRows) => {
                        if (error) {
                            console.log(error);
                            
                            return res.status(500).json({ error } + 'ici');
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

    static async  getAllProfil (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { actif } = req.auth || {};
            if (actif == '1') {
                const profilModel: ProfilModel = new ProfilModel();;
                
                const arrayProfil: Profil[] = await profilModel.findProfil('WHERE actif = 1');         
    
                res.status(200).json(arrayProfil);
                return;
            } 
            res.status(404).json({ error : 'Pas autorisé'})
            return;
    
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });    
            return;
        }
    }

    static async getProfilById (req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
        try {
            const { role, actif } = req.auth || {};
            const id: number = Number(req.params.id);
    
            if (isNaN(id)) {
                res.status(400).json({ error: 'ID Profil invalide' });
                return;
            }
    
            if (actif == '1' || role == '1') {
                const profilModel: ProfilModel = new ProfilModel();
                const result: Profil[] = await profilModel.findById(id);
    
                if (result && result.length > 0) {
                    const profil: Profil = result[0];
    
                    res.status(200).json(profil);
                    return
                }
    
    
            } else {
                    res.status(404).json({ error: 'Profil non trouvé' });
                    return;
                }
        } catch (error) {
            res.status(500).json({ error: 'Erreur interne du serveur' });    
            return;
        }
    }
}
