import { ProfilModel } from "../Models/ProfilModel";
import Profil from "../Types/Profil";

export class ProfilController {
    static async updateProfil (profil: Profil, id: number, token: string): Promise<void | boolean> {
        return await ProfilModel.updateProfil(profil, id, token);
    }
}