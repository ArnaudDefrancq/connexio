import User from "../types/user";
import { Dao } from "../DAO/dao";

export class UserModel {
    private userDao: Dao<User>; 

    constructor() {
        this.userDao = new Dao('user');
      }
    
      public createUser(user: User, callback: (error: Error | null, insertId?: number) => void) {
        this.userDao.create(user, callback);
      }
}


