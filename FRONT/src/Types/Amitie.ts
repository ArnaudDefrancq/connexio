import { AmitieStatus } from "./StatusEnum";

export interface Amitie {
    id_amitie: number,
    id_profil: number,
    id_profil_1: number,
    status: AmitieStatus
    ask: number
};

export interface NewAmitie {
    id_profil: number,
    id_profil_1: number,
    status: AmitieStatus
    ask: number
}

export interface AmitieWithProfil {
    id_amitie: number,
    id_profil: number,
    id_profil_1: number,
    status: AmitieStatus,
    ask: number,
    nom: string,
    prenom: string,
    img_profil: string,
}