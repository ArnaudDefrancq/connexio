import { UpdateProfil, Profil } from "../Types/Profil";
import axios from 'axios';

export class ProfilModel implements Profil {
    id_profil?: number;
    nom: string;
    prenom: string;
    date_naissance: number;
    img_profil: string;
    img_bg: string;
    ville: string;
    description: string;
    actif: number;
    created_at: number;
    updated_at: number;
    id_user: number;

    constructor(data: Profil) {
        this.id_profil = data.id_profil;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.date_naissance = data.date_naissance;
        this.img_profil = data.img_profil;
        this.img_bg = data.img_bg;
        this.ville = data.ville;
        this.description = data.description;
        this.actif = Number(data.actif);
        this.created_at = Number(data.created_at);
        this.updated_at = Number(data.updated_at);
        this.id_user = Number(data.id_user);
    }

    static async updateProfil(profil: UpdateProfil, id: number, token: string) :Promise<void | boolean> {
        try {
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            console.log(profil);
            
            const res = await axios.put(`${import.meta.env.VITE_URL_PROFIL}/${id}/update`, profil, config);
            

            if(res) {
                return true;
            }
        } catch (error) {
            console.error('Erreur profil update: ', error);
            return false;
        }
    }

    static async getOneProfil (idProfil: number, token: string): Promise<Profil> {
        try {
            const config = {
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            const res = await axios.get(`${import.meta.env.VITE_URL_PROFIL}/${idProfil}/profil`, config);       
            return res.data;
        } catch (error) {
            console.error(error + "Pb getOneProfil");
            throw error;
        }
    }
}