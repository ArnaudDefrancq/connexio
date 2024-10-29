import { ProfilModel } from "../Models/ProfilModel";
import { UpdateProfil, Profil } from "../Types/Profil";

export class ProfilController {
    static async updateProfil (profil: UpdateProfil, id: number, token: string): Promise<void | boolean> {        
        return await ProfilModel.updateProfil(profil, id, token);
    }

    static async getOneProfil (idProfil: number, token: string): Promise<Profil> {
        return await ProfilModel.getOneProfil(idProfil, token);
    }
}