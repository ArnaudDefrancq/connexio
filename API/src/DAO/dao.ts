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

    public find(select: string[], where: string): Promise<T[]> {
        const selectFields = select.join(", ");
        const queryString = `SELECT ${selectFields} FROM cx__${this.tableName} WHERE ${where}`;
        
        console.log(queryString);
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
}