import { Db, MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'test';


export class DbConfig {

    private dbInstance: null | MongoClient;
    private db: null | Db;
    static instance: DbConfig;

    private constructor() {
        this.dbInstance = null;
        this.db = null;

        if(!mongoUrl) {
            throw new Error('⚠⚠ MONGO_URL is not defined');
        }

    }

    public static getInstance(): DbConfig {
        if(!DbConfig.instance) {
            DbConfig.instance = new DbConfig();
        }

        return DbConfig.instance;
    }

    public async connect() {
        if(!this.dbInstance) {
            this.dbInstance = new MongoClient(mongoUrl);
        }

        this.db = this.dbInstance.db(dbName);
        console.log(`[DB] Successfully connected to ${this.db.databaseName}`);
    }

    public connectCollection(collectionName: string) {
        if(!this.db) {
            throw new Error('⚠⚠ Database is not connected');
        }
        
        const collection = this.db.collection(collectionName);
        console.log(`[DB] Collection ${collection.collectionName} is connected`);

        return collection;
    } 


}
