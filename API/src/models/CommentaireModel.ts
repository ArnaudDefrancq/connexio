import { Dao } from "../DAO/DAO";
import Commentaire from "../types/Commentaire";


export class CommentaireModel {
    private commentaireDao: Dao<Commentaire>;

    constructor() {
        this.commentaireDao = new Dao('commentaire');
    }
    
    public createCommentaire(commentaire: Commentaire, callback: (error: Error | null, insertId?: number) => void) : void {
        return this.commentaireDao.create(commentaire, callback);
      }
    
      public findCommentaire(where: string, select: string = "*", queryString?: string): Promise<Commentaire[]> {
        return  this.commentaireDao.find(where, select, queryString);
      }

      public findById(id: number, select: string = "*", queryString?: string): Promise<Commentaire[]> {
        return this.commentaireDao.findById(id, select, queryString);
      }
    
      public updateCommentaire(id: number, commentaire: Partial<Commentaire>, callback: (error: Error | null, affectedRows?: number) => void): void {
        return this.commentaireDao.update(id, commentaire, callback)
      }
      public deleteCommentaire(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
        return this.commentaireDao.delete(id, callback);
      }
}