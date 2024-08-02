import { Dao } from "../DAO/DAO";
import Profil from "../types/Profil";


export class ProfilModel {
    private profilDao: Dao<Profil>;

    constructor() {
        this.profilDao = new Dao('profil');
    }
    
    public createProfil(profil: Profil, callback: (error: Error | null, insertId?: number) => void) : void {
        return this.profilDao.create(profil, callback);
      }
    
      public findProfil(where: string, select: string = "*"): Promise<Profil[]> {
        return  this.profilDao.find(where, select);
      }

      public findAllProfil(select: string = "*"): Promise<Profil[]> {
        return  this.profilDao.findAll();
      }
    
      public findById(id: number, select: string = "*"): Promise<Profil[]> {
        return this.profilDao.findById(id, select);
      }
    
      public updateProfil(id: number, profil: Partial<Profil>, callback: (error: Error | null, affectedRows?: number) => void): void {
        return this.profilDao.update(id, profil, callback)
      }
      public deleteProfil(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
        return this.profilDao.delete(id, callback);
      }
}