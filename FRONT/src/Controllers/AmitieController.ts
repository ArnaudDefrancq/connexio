import { AmitieModel } from "../Models/AmitieModel";
import { Amitie, NewAmitie } from "../Types/Amitie";

export class AmitieController {
    static async createRelation (newRelation: NewAmitie, token:string): Promise<void> {
        await AmitieModel.createRelation(newRelation, token);
    }

    static async updateRelation (idRelation: number, slug:string, token: string): Promise<void> {
        await AmitieModel.updateRelation(idRelation,slug,token);
    }

    static async getRelation (idProfil: number, slug: string, token: string): Promise<Array<Amitie> | void> {
        await AmitieModel.getRelation(idProfil, slug, token);
    }

    static async getOneRelation (idRelation: number, token: string): Promise<Amitie | void> {
        await AmitieModel.getOneRelation(idRelation, token);
    }

    static async deleteRelation (idRelation: number, token: string): Promise<void> {
        await AmitieModel.deleteRelation(idRelation, token);
    }
}