import path from 'path';
import fs from 'fs/promises';

export class Folder {
    public static async createFolder(id: string): Promise<boolean> {
        const profilFolder = path.join(__dirname, '../img/imgProfil', id);
        const postFolder = path.join(__dirname, '../img/imgPost', id);
        console.log(profilFolder);

        try {
            // Vérifier et créer le dossier profil si nécessaire
            if (!(await Folder.folderExists(profilFolder))) {
                await fs.mkdir(profilFolder, { recursive: true });
            }

            // Vérifier et créer le dossier post si nécessaire
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
}
