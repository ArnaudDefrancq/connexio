import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Dao } from '../DAO/dao';


dotenv.config();

export class Security {
    public static async hashPassword(password:string): Promise<string> {
        try {
           const passwordHash = await bcrypt.hash(password, Number(process.env.SALT))
           return passwordHash;
        } catch (error) {
            throw new Error('Problem hash')
        }
    }

    public static async checkEmail(email: string): Promise<boolean> {
        try {
            const dao = new Dao<any>('User');
            const where = 'email = ?'; 
            const results = await dao.find(['email'], where, [email]);
            
            return results.length > 0; 
        } catch (error) {
            console.error('Problem checking email:', error);
            throw new Error('Problem checking email');
        }
    }
}