import { User } from "../Types/User";
import { Auth, AuthSignUp } from "../Types/Auth";
import axios from "axios";

export class UserModel implements User {
    id_user?: number;
    email: string;
    password: string;
    created_at: number;
    id_role: number;

    constructor(data: User) {
        this.id_user = data.id_user;
        this.email = data.email;
        this.password = data.password;
        this.created_at = data.created_at;
        this.id_role = data.id_role;
    }

    static async fetchSignIn(email: string, password: string) : Promise<{id_role: string; token: string; id_user: string, is_actif: string} | string> {
        try {
            const auth: Auth =  {
                email,
                password
            }

            const res = await axios.post(`${import.meta.env.VITE_URL_AUTH}/signin`, auth);
                
            return {
                id_user: res.data.user_id,
                id_role: res.data.role,
                is_actif: res.data.actif,
                token: res.data.token
            };
    
        } catch (error) {
            console.error("Erreur de connexion:", error);
            return 'Erreur de connexion';
        }
    }

    static async fetchSignUp(email: string, password: string): Promise<void | string> {
        try {
            const auth: AuthSignUp = {
                email,
                password,
                id_role: 3
            };

            await axios.post(`${import.meta.env.VITE_URL_AUTH}/signup`, auth)

            return;
        } catch (error) {
            console.error("Erreur de création user:", error);
            return 'Erreur de création user';
        }
    }
 //TODO
    // static async fetchModifyUser() {

    // }
}