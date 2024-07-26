import connection from "../../db-config";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class Dao<T> {

    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    public create(item: T, callback: Function): void {
        const queryString = `INSERT INTO cx__${this.tableName} SET ?`;  
        connection.query(queryString, item, (error, result ) => {
            if (error) {
                return callback(error);
            }

            const { insertId } = <ResultSetHeader>result;
            callback(null, insertId);
        })
    }

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
    public findById(id: number, select: string): Promise<T> {

        const queryString = `SELECT ${select} FROM cx__${this.tableName} WHERE id_${this.tableName}=${id}`;

        return new Promise<T>((resolve, reject) => {
            connection.query(queryString, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results as T);
                }
            });
        });
    }
}