import CryptoJS from "crypto-js";
import { UserState } from "../Types/UserState";

export class Security {
    static encryptData(data:object): string {
        return CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_KEY_CRYPTO).toString();
    }

    static decryptData(encryptData: string): UserState {
        const bytes = CryptoJS.AES.decrypt(encryptData, import.meta.env.VITE_KEY_CRYPTO);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}