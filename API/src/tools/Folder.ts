import path from 'path';
import * as fs from 'fs/promises';


export class Folder {
    public static async createFolder(id: string): Promise<boolean> {
        const profilFolder = path.join(__dirname, '../img/imgProfil', id);
        const postFolder = path.join(__dirname, '../img/imgPost', id);

        try {
            if (!(await Folder.folderExists(profilFolder))) {
                await fs.mkdir(profilFolder, { recursive: true });

                const profil = path.join(__dirname, '../img/imgProfil', id, 'profil');
                const bg = path.join(__dirname, '../img/imgProfil', id, 'bg');

                await fs.mkdir(profil, { recursive: true });
                await fs.mkdir(bg, { recursive: true });
            }

            if (!(await Folder.folderExists(postFolder))) {
                await fs.mkdir(postFolder, { recursive: true });
            }

            return true;
        } catch (error) {
            console.error('Erreur lors de la création des dossiers:', error);
            return false;
        }
    }

    private static async folderExists(folderPath: string): Promise<boolean> {
        try {
            await fs.access(folderPath);
            return true;
        } catch {
            return false;
        }
    }

    public static async deleteFolder(id: string): Promise<boolean> {
        const profilFolder = path.join(__dirname, '../img/imgProfil', id);
        const postFolder = path.join(__dirname, '../img/imgPost', id);

        try {
            if (await this.folderExists(profilFolder)) {
                await fs.rm(profilFolder, { recursive: true, force: true})
            }
            if (await this.folderExists(postFolder)) {
                await fs.rm(postFolder, { recursive: true, force: true})
            }

            return true;
        }catch (error) {
            console.error('Erreur lors de la suppression des dossiers:', error);
            return false;
        }
    }
}
