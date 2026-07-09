import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'gymsage-db';
const DB_VERSION = 2;

let db: IDBPDatabase<any> | null = null;

export const initDatabase = async (): Promise<IDBPDatabase<any>> => {
  if (db) return db;

  db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (!db.objectStoreNames.contains('exercises')) {
        const store = db.createObjectStore('exercises', { keyPath: 'id' });
        store.createIndex('by-muscle', 'muscle_group');
        store.createIndex('by-lumbar', 'is_lumbar_safe');
        store.createIndex('by-custom', 'is_custom');
      }
      if (!db.objectStoreNames.contains('exercise_images')) {
        db.createObjectStore('exercise_images', { keyPath: 'exercise_id' });
      }
      if (!db.objectStoreNames.contains('workout_plans')) {
        const store = db.createObjectStore('workout_plans', { keyPath: 'id' });
        store.createIndex('by-frequency', 'frequency');
      }
      if (!db.objectStoreNames.contains('plan_divisions')) {
        const store = db.createObjectStore('plan_divisions', { keyPath: 'id' });
        store.createIndex('by-plan', 'plan_id');
      }
      if (!db.objectStoreNames.contains('workout_sessions')) {
        const store = db.createObjectStore('workout_sessions', { keyPath: 'id' });
        store.createIndex('by-date', 'date');
        store.createIndex('by-division', 'division');
      }
      if (!db.objectStoreNames.contains('workout_sets')) {
        const store = db.createObjectStore('workout_sets', { keyPath: 'id' });
        store.createIndex('by-session', 'session_id');
      }
      if (!db.objectStoreNames.contains('da_fit_metrics')) {
        const store = db.createObjectStore('da_fit_metrics', { keyPath: 'id' });
        store.createIndex('by-date', 'date');
        store.createIndex('by-type', 'type');
      }
      if (!db.objectStoreNames.contains('user_profile')) {
        db.createObjectStore('user_profile', { keyPath: 'id' });
      }
    },
  });

  return db;
};

export const getDatabase = (): IDBPDatabase<any> => {
  if (!db) throw new Error('Database not initialized');
  return db;
};
