import * as Db from "res/types/database";

const db = globalThis.db;

const cache = new Map<string, string>();

setInterval(() => {
    cache.clear();
}, globalThis.cacheTime);

export const getChannel = async (serverId: string): Promise<string> => {
    if (cache.get(serverId)) {
        return new Promise((res) => res(cache.get(serverId)));
    }

    const query: Db.Servers[] = await (db.execute(readFile("@sql/servers/getServer.sql"), [serverId]))[0];

    return new Promise((res, rej) => {
        if (query.length != 1) {
            rej("Not Registered");
        } else {
            cache.set(serverId, query[0].channel);
            res(query[0].channel);
        }
    });
};