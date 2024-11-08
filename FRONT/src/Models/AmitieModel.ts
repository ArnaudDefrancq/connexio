import axios from "axios";
import { Amitie, NewAmitie } from "../Types/Amitie";
import { AmitieStatus } from "../Types/StatusEnum";

export class AmitieModel implements Amitie {
    id_amitie: number;
    id_profil: number;
    id_profil_1: number;
    status: AmitieStatus;

    constructor(data: Amitie) {
        this.id_amitie = data.id_amitie;
        this.id_profil = data.id_profil;
        this.id_profil_1 = data.id_profil_1;
        this.status = data.status;
    }

    static async createRelation (newRelation: NewAmitie, token:string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const res = await axios.post(`${import.meta.env.VITE_URL_AMITIE}`, newRelation, config);

            return res.data;
        }   catch (error) {
            console.log(('Pb newRelation' + error));
            return;
        }
    }

    static async updateRelation (idRelation: number, slug: string, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const res = await axios.put(`${import.meta.env.VITE_URL_AMITIE}/${idRelation}`, { status: slug }, config);

            return res.data;
        } catch (error) {
            console.log('Pb updateRelation' + error);
            return;
        }
    }

    static async getRelation (idProfil: number, slug: string, token: string): Promise<Array<Amitie>> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const res = await axios.get(`${import.meta.env.VITE_URL_AMITIE}/${idProfil}/${slug}`, config);
            const allRelation: Array<Amitie> = res.data;
            return allRelation.reverse();
        } catch (error) {
            console.log('Pb getRelation' + error);
            return [];
        }
    }

    static async getOneRelation (idRelation: number, token: string): Promise<Amitie> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const res = await axios.get(`${import.meta.env.VITE_URL_AMITIE}/${idRelation}`, config);

            return res.data[0];
        } catch (error) {
            console.log('Pb getRelation' + error);
            throw error;
        }
    }

    static async deleteRelation (idReletation: number, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            const res = await axios.delete(`${import.meta.env.VITE_URL_AMITIE}/${idReletation}`, config);
            return res.data;
        } catch (error) {
            console.log('Pb deleteRelation' + error);
            return;
        }
    }
}