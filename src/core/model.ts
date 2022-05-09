import { Collection, ObjectId } from 'mongodb';
import { DbConfig } from './db.config';

const dbConfig = DbConfig.getInstance();

export class Model {

    collection: Collection;

    constructor(collectionName: string) {
        this.collection = dbConfig.connectCollection(collectionName);
    }

    getAll() {
        return new Promise((accept, reject) => {
            this.collection.find().toArray((err, results) => {
             if (err) {
                 reject(err);
             } else {
                accept(results);
             }
            });
        });
    }

    getOne(id: string) {
        return this.collection.findOne({
            _id: new ObjectId(id)
        });
    }

}