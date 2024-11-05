import connection from "../../db-config";
import { ResultSetHeader } from "mysql2";

export class Dao<T> {

    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    /**
     * CREATE DAO
     * @param item Objet a mettre en BDD - Object
     * @param callback Retour - Function
     */
    public create(item: T, callback: (error: Error | null, insertId?: number) => void): void {
        const queryString: string = `INSERT INTO cx__${this.tableName} SET ?`;
        connection.query(queryString, item, (error, result) => {
            if (error) {
                return callback(error);
            }

            const { insertId } = result as ResultSetHeader;
            callback(null, insertId);
        });
    }

    /**
     * SELECT DAO
     * @param where Clause - string
     * @param select Colonne (si empty "*") - string
     * @returns tableau d'objet
     */
    public find(where: string, select: string = '*', queryString?: string): Promise<T[]> {
        const query: string = queryString || `SELECT ${select} FROM cx__${this.tableName} ${where}`;        

        return new Promise<T[]>((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as T[]);
                }
            });
        });
    }



    /**
     * SELECT ID DAO
     * @param id Id en BDD - number
     * @param select Colonne (si empty "*") - string
     * @returns Object
     */
    public findById(id: number, select: string = '*', queryString?: string): Promise<T[]> {
        const query: string = queryString || `SELECT ${select} FROM cx__${this.tableName} WHERE id_${this.tableName} = ?`;
        
        return new Promise<T[]>((resolve, reject) => {
            connection.query(query, [id], (error, results) => {
                if (error) {                    
                    reject(error);
                } else {
                    resolve(results as T[]);
                }
            });
        });
    }

    /**
     * UPDATE DAO
     * @param id Id en BDD - number
     * @param item Objet a mettre a jour - Object
     * @param callback Retour - Function
     */
    public update(id: number, item: Partial<T>, callback: (error: Error | null, affectedRows?: number) => void): void {
        const queryString: string = `UPDATE cx__${this.tableName} SET ? WHERE id_${this.tableName} = ?`;
        connection.query(queryString, [item, id], (error, result) => {
            if (error) {
                return callback(error);
            }

            const { affectedRows } = result as ResultSetHeader;
            callback(null, affectedRows);
        });
    }

    /**
     * DELETE DAO
     * @param id Id en BDD - number
     * @param callback Retour - Function
     */
    public delete(id: number, callback: (error: Error | null, affectedRows?: number) => void): void {
        const query: string = `DELETE FROM cx__${this.tableName} WHERE id_${this.tableName} = ?`;
        connection.query(query, [id], (error, result) => {
            if (error) {
                return callback(error);
            }

            const { affectedRows } = result as ResultSetHeader;
            callback(null, affectedRows);
        });
    }
}