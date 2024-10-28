import CommentaireLike from "../Types/CommentaireLike";

export class CommentaireLikeModel implements CommentaireLike {
    id_commentaire_like?: number;
    id_profil: number;
    id_commentaire: number;

    constructor(data: CommentaireLike) {
        this.id_commentaire_like = data.id_commentaire_like;
        this.id_commentaire = data.id_commentaire;
        this.id_profil = data.id_profil;
    }

    static async createCommentaireLike () {}
    static async getAllCommentaireLike () {}
    static async getOneCommentaireLike () {}
    static async deleteCommentaireLike () {}
}