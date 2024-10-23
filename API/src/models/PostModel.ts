import { Dao } from "../DAO/DAO";
import Post from "../types/Post";


export class PostModel {
    private postDao: Dao<Post>;

    constructor() {
        this.postDao = new Dao('post');
    }
    
    public createPost(post: Post, callback: (error: Error | null, insertId?: number) => void) : void {
        return this.postDao.create(post, callback);
      }
    
      public findPost(where: string, select: string = "*", queryString?: string): Promise<Post[]> {
        return  this.postDao.find(where, select, queryString);
      }

      public findById(id: number, select: string = "*", queryString?: string): Promise<Post[]> {
        return this.postDao.findById(id, select, queryString);
      }
    
      public updatePost(id: number, post: Partial<Post>, callback: (error: Error | null, affectedRows?: number) => void): void {
        return this.postDao.update(id, post, callback)
      }
      public deletePost(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
        return this.postDao.delete(id, callback);
      }
}