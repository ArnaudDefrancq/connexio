export interface Post {
    id_post?: number,
    content: string,
    media?: string | null,
    created_at: number,
    updated_at: number
    id_profil: number
};

export default Post;