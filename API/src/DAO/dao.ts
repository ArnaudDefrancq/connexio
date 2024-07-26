import connection from "../../db-config";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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
    public create(item: T, callback: Function): void {
        const queryString = `INSERT INTO cx__${this.tableName} SET ?`;  
        connection.query(queryString, item, (error, result) => {
            if (error) {
                return callback(error);
            }

            const { insertId } = <ResultSetHeader>result;
            callback(null, insertId);
        })
    }

    /**
     * SELECT DAO
     * @param where Clause - string
     * @param select Colonne (si empty "*") - string
     * @returns tableau d'objet
     */
    public find(where: string, select: string): Promise<T[]> {
        const queryString = `SELECT ${select} FROM cx__${this.tableName} WHERE ${where}`;
        
        return new Promise<T[]>((resolve, reject) => {
            connection.query(queryString, (error, results) => {
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
    public findById(id: number, select: string): Promise<T[]> {

        const queryString = `SELECT ${select} FROM cx__${this.tableName} WHERE id_${this.tableName}=${id}`;

        return new Promise<T[]>((resolve, reject) => {
            connection.query(queryString, (error, results) => {
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
    public update(id: number, item: Partial<T>, callback: Function): void {
        const queryString = `UPDATE cx__${this.tableName} SET ? WHERE id_${this.tableName}=${id}`;
            connection.query(queryString, item, (error, result) => {
            if (error) {
                return callback(error);
            }

            const { affectedRows } = <ResultSetHeader>result;
            callback(null, affectedRows);
        });
    }
}