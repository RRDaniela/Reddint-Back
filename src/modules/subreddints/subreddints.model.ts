import { Model } from "../../core/model";


interface ISubReddintSchema {
    email: string;
    password: string;
    karma: number;
    avatar: string;
    insignia: string;
}

class SubReddint extends Model {

    constructor() {
        super('subreddints');
    }

    create(subreddint: ISubReddintSchema) {
        return this.collection.insertOne(subreddint);
    }


}