import { Schema, model } from 'mongoose';

export interface IUserSchema {
    email: string;
    username:string;
    password: string;
    karma: number;
    avatar: string;
    insignia?: string;
}

const userSchema = new Schema<IUserSchema>({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    karma: {
        type: Number,
        default: 0,
    },
    avatar: {
        type: String,
        default: 'https://i.kym-cdn.com/entries/icons/facebook/000/021/155/Fish_wearing_a_chicken_smoking_a_cigarette_cover.jpg',
    },
    insignia: {
        type: String,
        required: false,
        default: 'https://i.kym-cdn.com/entries/icons/facebook/000/021/155/Fish_wearing_a_chicken_smoking_a_cigarette_cover.jpg',
    },
});

const User = model<IUserSchema>('User', userSchema);

export default User;