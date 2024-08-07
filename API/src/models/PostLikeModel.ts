import { Dao } from "../DAO/DAO";
import PostLike from "../types/PostLike";


export class PostLikeModel {
    private postLikeDao: Dao<PostLike>;

    constructor() {
        this.postLikeDao = new Dao('post_like');
    }
    
    public createPostLike(postLike: PostLike, callback: (error: Error | null, insertId?: number) => void) : void {
        return this.postLikeDao.create(postLike, callback);
      }
    
      public findPostLike(where: string, select: string = "*"): Promise<PostLike[]> {
        return  this.postLikeDao.find(where, select);
      }

      public findById(id: number, select: string = "*"): Promise<PostLike[]> {
        return this.postLikeDao.findById(id, select);
      }
    
      public updatePostLike(id: number, postLike: Partial<PostLike>, callback: (error: Error | null, affectedRows?: number) => void): void {
        return this.postLikeDao.update(id, postLike, callback)
      }
      public deletePostLike(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
        return this.postLikeDao.delete(id, callback);
      }
}