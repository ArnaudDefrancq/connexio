import axios from "axios";
import { Commentaire, NewCommentaire } from "../Types/Commentaire";

export class CommentaireModel implements Commentaire {
    id_commentaire?: number;
    content: string;
    created_at: number;
    id_post: number;
    id_profil: number;

    constructor(data: Commentaire) {
        this.id_commentaire = data.id_commentaire;
        this.content = data.content;
        this.created_at = data.created_at;
        this.id_post = data.id_post;
        this.id_profil = data.id_profil;
    }

    static async createCommentaire (commentaire: NewCommentaire, token: string): Promise<void> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            };

            await axios.post(`${import.meta.env.VITE_URL_COMMENTAIRE}`, commentaire, config);

            return;
        } catch (error) {
            console.log('pb add com' + error);
            return;
        }
    }
}