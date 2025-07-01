import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const db = await SQLite.openDatabase({ name: 'app.db', location: 'default' });

export const initDB = async () => {
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT UNIQUE,
      password TEXT,
      phone TEXT
    );`
  );
};

export const insertUser = async (
  name: string,
  username: string,
  password: string,
  phone: string
) => {
  return db.executeSql(
    `INSERT INTO users (name, username, password, phone) VALUES (?, ?, ?, ?)`,
    [name, username, password, phone]
  );
};

export const getUserByUsername = async (username: string) => {
  const results = await db.executeSql(
    `SELECT * FROM users WHERE username = ?`,
    [username]
  );
  return results[0].rows.length ? results[0].rows.item(0) : null;
};

export const getUser = (username: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
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
