interface Profil {
    id_profil: number,
    nom: string,
    prenom: string,
    date_naissance: number,
    img_profil: string,
    img_bg: string,
    ville: string,
    description: string,
    created_at: number,
    updated_at: number
    id_user: number
};

export default Profil;