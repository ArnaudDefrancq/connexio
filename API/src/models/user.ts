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

    public findUser(select: string[], where: string): Promise<User[]> {
      return  this.userDao.find(select, where);
  }
}


