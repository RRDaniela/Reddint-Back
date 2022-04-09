import bcrypt from 'bcrypt';

export const passwordHelper = {
    hash: (password: string) => {
        return bcrypt.hash(password, 10);
    },
    compare: (password: string, hash: string) => {
        return bcrypt.compare(password, hash);
    }
};