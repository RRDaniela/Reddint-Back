import { Model } from "../../core/model";


interface IUserSchema {
    email: string;
    password: string;
    karma: number;
    avatar: string;
    insignia: string;
}

class User extends Model {

    constructor() {
        super('users');
    }

    create(user: IUserSchema) {
        return this.collection.insertOne(user);
    }


}