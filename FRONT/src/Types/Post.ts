export interface Post {
    id_post?: number,
    content: string,
    media?: string | null,
    created_at: number,
    updated_at: number
    id_profil: number
};

export interface newPost {
    content: string,
    media?: File | null,
}

export interface PostWithProfil {
    id_post?: number,
    content: string,
    media?: string | null,
    created_at: number,
    updated_at: number,
    id_profil: number,
    nom: string,
    prenom: string
}