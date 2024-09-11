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

    private static checkInput = (value: string, regex: RegExp): boolean  => {
        return regex.test(value) && value != "";
    }
    
    static checkValidity<E>(value: string, regex: RegExp, node: keyof E, setErrors: React.Dispatch<React.SetStateAction<E>>): void {
        if (this.checkInput(value, regex)) {
            setErrors((prevErrors: E) => ({
            ...prevErrors,
            [node]: false,
            }));
        } else {
            setErrors((prevErrors: E) => ({
            ...prevErrors,
            [node]: true,
            }));
        }
    }

    static checkSamePassword <E>(value: string, password :string, node: keyof E, setErrors: React.Dispatch<React.SetStateAction<E>>): void {
        if (password == value) {
            setErrors((prevErrors: E) => ({
                ...prevErrors,
                [node]: false
            }));
  
        } else {
            setErrors((prevErrors: E) => ({
                ...prevErrors,
                [node]: true
            }));
        }
    }
}