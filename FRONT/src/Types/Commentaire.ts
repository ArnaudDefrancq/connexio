export interface Commentaire {
    id_commentaire?: number,
    content: string,
    created_at: number,
    id_post: number,
    id_profil: number
};

export interface NewCommentaire {
    content: string,
    id_post: number,
    id_profil: number
}