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
            throw new Error('Problem hash');
        }
    }

    public static async checkEmail(email: string): Promise<boolean> {
        try {
            const dao = new Dao('User');
            const where = `email = '${email}'`
            const results = await dao.find(['email'], where);
            
            return results.length > 0; 
        } catch (error) {
            console.error('Problem checking email:', error);
            throw new Error('Problem checking email');
        }
    }

    public static async checkPassword(password: string, passwordHash: string): Promise<boolean> {
        try {
            const compare = await bcrypt.compare(password, passwordHash);
            return compare;
        } catch (error) {
            throw new Error('Problem checkPassword');
        }
    }
}