import  { UserModel } from '../Models/UserModel';

export class UserController {
    static async signIn(email: string, password: string) : Promise<{id_role: number; token: number; id_user: number, is_actif: number} | boolean> {
        return await UserModel.fetchSignIn(email, password);
    }

    static async signUp(email: string, password: string): Promise<void | string> {
        return await UserModel.fetchSignUp(email, password);
    }
}