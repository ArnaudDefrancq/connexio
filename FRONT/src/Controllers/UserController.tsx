import  { UserModel } from '../Models/UserModel';

export class UserController {
    static async signIn(email: string, password: string) : Promise<{id_role: string; token: string; id_user: string} | string> {
        return await UserModel.fetchSignIn(email, password);
    }

    static async signUp(email: string, password: string): Promise<void | string> {
        return await UserModel.fetchSignUp(email, password);
    }
}