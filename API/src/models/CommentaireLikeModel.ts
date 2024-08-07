import { Dao } from "../DAO/DAO";
import CommentaireLike from "../types/CommentaireLike";


export class CommentaireLikeModel {
    private commentaireLikeDao: Dao<CommentaireLike>;

    constructor() {
        this.commentaireLikeDao = new Dao('commentaire_like');
    }
    
    public createCommentaireLike(commentaireLike: CommentaireLike, callback: (error: Error | null, insertId?: number) => void) : void {
        return this.commentaireLikeDao.create(commentaireLike, callback);
      }
    
      public findCommentaireLike(where: string, select: string = "*"): Promise<CommentaireLike[]> {
        return  this.commentaireLikeDao.find(where, select);
      }

      public findById(id: number, select: string = "*"): Promise<CommentaireLike[]> {
        return this.commentaireLikeDao.findById(id, select);
      }
    
      public updateCommentaireLike(id: number, commentaireLike: Partial<CommentaireLike>, callback: (error: Error | null, affectedRows?: number) => void): void {
        return this.commentaireLikeDao.update(id, commentaireLike, callback)
      }
      public deleteCommentaireLike(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
        return this.commentaireLikeDao.delete(id, callback);
      }
}