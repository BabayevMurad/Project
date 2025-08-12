import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('tasks.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      deadline TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );
  `);
  return db;
};
