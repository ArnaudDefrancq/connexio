import { AmitieStatus } from "./statusEnum";

interface Amitie {
    id_amitie: number,
    id_profil: number,
    id_profil_1: number,
    status: AmitieStatus
};

export default Amitie;