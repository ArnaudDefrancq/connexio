import User from "../types/User";
import { Dao } from "../DAO/DAO";

export class UserModel {
  private userDao: Dao<User>; 

  constructor() {
    this.userDao = new Dao('user');
  }
  
  public createUser(user: User, callback: (error: Error | null, insertId?: number) => void) : void {
    return this.userDao.create(user, callback);
  }

  public findUser(where: string, select: string = "*"): Promise<User[]> {
    return  this.userDao.find(where, select);
  }

  public findById(id: number, select: string = "*"): Promise<User[]> {
    return this.userDao.findById(id, select);
  }

  public updateUser(id: number, user: Partial<User>, callback: (error: Error | null, affectedRows?: number) => void): void {
    return this.userDao.update(id, user, callback)
  }
  public deleteUSer(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
    return this.userDao.delete(id, callback);
  }
}


