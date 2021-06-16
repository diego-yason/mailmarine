import * as Db from "res/types/database";

const membercache = new Map<string, number>();

const db = globalThis.db;

setInterval(() => {
    membercache.clear();
}, globalThis.cacheTime);

export const getLocalUser = async (userId: string): Promise<number> => {
    if (membercache.get(userId)) {
        return new Promise((res) => res(membercache.get(userId)));
    }

    const query: Db.User[] = await (db.execute(readFile("/res/sql/users/readUsersById.sql"), [userId]))[0];

    return new Promise((res, rej) => {
        if (query.length != 1) {
            rej("Not Registered");
        } else {
            membercache.set(userId, query[0].localid);
            res(query[0].localid);
        }
    });
};

export const newUser = (userId: string): void => {
    db.execute(readFile("/res/sql/users/createUser.sql"), [userId]);
};