import User from "../types/user";
import { Dao } from "../DAO/dao";

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

  public updateUser(id: number, user: User, callback: (error: Error | null, affectedRows?: number) => void): void {
    return this.userDao.update(id, user, callback)
  }
}


