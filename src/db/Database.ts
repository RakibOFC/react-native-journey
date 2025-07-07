import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase;

export const getDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabase({ name: 'app.db', location: 'default' });
  }
  return db;
};

export const initDB = async () => {
  const database = await getDB();
  await database.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT UNIQUE,
      password TEXT,
      phone TEXT
    );
  `);
};

export const insertUser = async (
  name: string,
  username: string,
  password: string,
  phone: string
) => {
  const database = await getDB();
  return database.executeSql(
    `INSERT INTO users (name, username, password, phone) VALUES (?, ?, ?, ?)`,
    [name, username, password, phone]
  );
};

export const getUserByUsername = async (username: string) => {
  const database = await getDB();
  const results = await database.executeSql(
    `SELECT * FROM users WHERE username = ?`,
    [username]
  );
  return results[0].rows.length ? results[0].rows.item(0) : null;
};

export const getUser = async (username: string, password: string): Promise<any> => {
  const database = await getDB();
  return new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_, result) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const getUserById = async (id: number): Promise<any | null> => {
  const database = await getDB();
  const results = await database.executeSql(
    `SELECT * FROM users WHERE id = ?`,
    [id]
  );

  if (results.length > 0 && results[0].rows.length > 0) {
    return results[0].rows.item(0);
  }

  return null;
};
