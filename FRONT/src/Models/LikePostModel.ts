import PostLike from "../Types/PostLike";

export class LikePostModel implements PostLike {
    id_post_like?: number;
    id_profil: number;
    id_post: number;

    constructor(data: PostLike) {
        this.id_post_like = data.id_post_like;
        this.id_profil = data.id_profil;
        this.id_post = data.id_post
    }

    static async createPostLike ()
}