import { Dao } from "../DAO/DAO";
import Amitie from "../types/Amitie";


export class AmitieModel {
    private amitieDao: Dao<Amitie>;

    constructor() {
        this.amitieDao = new Dao('amitie');
    }
    
    public createAmitie(amitie: Amitie, callback: (error: Error | null, insertId?: number) => void) : void {
        return this.amitieDao.create(amitie, callback);
      }
    
      public findAmitie(where: string, select: string = "*"): Promise<Amitie[]> {
        return  this.amitieDao.find(where, select);
      }

      public findById(id: number, select: string = "*"): Promise<Amitie[]> {       
        return this.amitieDao.findById(id, select);
      }
    
      public updateAmitie(id: number, amitie: Partial<Amitie>, callback: (error: Error | null, affectedRows?: number) => void): void {
        return this.amitieDao.update(id, amitie, callback)
      }
      public deleteAmitie(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
        return this.amitieDao.delete(id, callback);
      }
}