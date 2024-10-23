export interface Post {
    id_post?: number,
    content: string,
    media?: string | null,
    created_at: number,
    updated_at: number
    id_profil: number
};

export interface NewPost {
    content: string,
    media?: File | string | null,
}

export interface PostWithProfil {
    id_post?: number,
    content: string,
    media?: string | null,
    created_at: number,
    updated_at: number,
    id_profil: number,
    nom: string,
    prenom: string,
    img_profil: string
}