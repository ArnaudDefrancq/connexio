import { AmitieModel } from "../Models/AmitieModel";
import { AmitieWithProfil, NewAmitie } from "../Types/Amitie";

export class AmitieController {
    static async createRelation (newRelation: NewAmitie, token:string): Promise<void> {
        return await AmitieModel.createRelation(newRelation, token);
    }

    static async updateRelation (idRelation: number, slug:string, token: string): Promise<void> {
        return await AmitieModel.updateRelation(idRelation,slug,token);
    }

    static async getRelation (idProfil: number, slug: string, token: string): Promise<Array<AmitieWithProfil>> {
        return await AmitieModel.getRelation(idProfil, slug, token);
    }

    static async getOneRelation (idRelation: number, token: string): Promise<AmitieWithProfil> {
        return await AmitieModel.getOneRelation(idRelation, token);
    }

    static async deleteRelation (idRelation: number, token: string): Promise<void> {
        return await AmitieModel.deleteRelation(idRelation, token);
    }
}