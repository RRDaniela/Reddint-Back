import { Model } from "../../core/model";


interface IPostSchema {
    title: string;
    body: string;
    upvotes: number;
    downvotes: number;
}

class Post extends Model {

    constructor() {
        super('posts');
    }

    create(post: IPostSchema) {
        return this.collection.insertOne(post);
    }


}