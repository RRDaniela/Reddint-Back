import { ObjectId } from "mongodb";
import { Model } from "../../core/model";


interface IComment {
    body: string;
    upboates: number; // 🚢🚢
    downboates: number; // 🚢🚢
    owner: ObjectId;
    post: ObjectId; // related post
}

class Comment extends Model {

    constructor() {
        super('comments');
    }

    create(comment: IComment) {
        return this.collection.insertOne(comment);
    }
}