import * as membercache from "memory-cache";
import * as Db from "../../res/types/database";

const db = globalThis.db;

setInterval(() => {
    membercache.clear();
}, globalThis.cacheTime);

export const getUser = async (userId: string): Promise<number> => {
    if (membercache.get(userId)) {
        return new Promise((res) => res(membercache.get(userId)));
    }

    const query: Db.User[] = await (db.execute(readSql("/res/sql/users/readUsersById.sql"), [userId]))[0];

    return new Promise((res, rej) => {
        if (query.length != 1) {
            rej("Not Registered");
        } else {
            membercache.put(userId, query[0].localid);
            res(query[0].localid);
        }
    });
};

export const newUser = (userId: string): void => {
    db.execute(readSql("/res/sql/users/createUser.sql"), [userId]);
};