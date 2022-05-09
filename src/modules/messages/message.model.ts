import { ObjectId } from "mongodb";
import { Model } from "../../core/model";


interface IMessageSchema {
    body: string;
    fecha: Date;
    owner: ObjectId;
    destinatario: ObjectId;
}

class Post extends Model {

    constructor() {
        super('posts');
    }

    create(post: IMessageSchema) {
        return this.collection.insertOne(post);
    }
}