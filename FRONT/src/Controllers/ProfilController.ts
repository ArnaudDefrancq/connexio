import { ProfilModel } from "../Models/ProfilModel";
import { UpdateProfil } from "../Types/Profil";

export class ProfilController {
    static async updateProfil (profil: UpdateProfil, id: number, token: string): Promise<void | boolean> {        
        return await ProfilModel.updateProfil(profil, id, token);
    }
}