import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app.db');

const initDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS json_store (id TEXT PRIMARY KEY NOT NULL, json TEXT NOT NULL);",
                [],
                (_, result) => {
                    console.log('Database initialized', result);
                    resolve();
                },
                (_, error) => {
                    console.error('Error initializing database', error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};

const storeJson = (id: string, json: object): Promise<void> => {
    return new Promise((resolve, reject) => {
        const jsonString = JSON.stringify(json);
        db.transaction(tx => {
            tx.executeSql(
                "INSERT OR REPLACE INTO json_store (id, json) VALUES (?, ?);",
                [id, jsonString],
                (_, result) => {
                    console.log('JSON stored successfully', result);
                    resolve();
                },
                (_, error) => {
                    console.error('Error storing JSON', error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};

const getJson = <T>(id: string): Promise<T | null> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT json FROM json_store WHERE id = ?;",
                [id],
                (_, result) => {
                    if (result.rows.length > 0) {
                        const item = result.rows.item(0).json;
                        try {
                            const data = JSON.parse(item) as T;
                            resolve(data);
                        } catch (e) {
                            console.error('Error parsing JSON', e);
                            reject(e);
                        }
                    } else {
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.error('Error retrieving JSON', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

const removeJson = (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM json_store WHERE id = ?;",
                [id],
                (_, result) => {
                    console.log('JSON removed successfully', result);
                    resolve();
                },
                (_, error) => {
                    console.error('Error removing JSON', error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};

export const DatabaseService = {
    initDatabase,
    storeJson,
    getJson,
    removeJson,
};
