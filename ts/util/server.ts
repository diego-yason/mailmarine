import * as channelcache from "memory-cache";
import * as Db from "res/types/database";

setInterval(() => {
    channelcache.clear();
}, parseInt(process.env.CACHE) || 10800000);

export const getChannel = async (serverId: string): Promise<string> => {
    if (channelcache.get(serverId)) {
        return new Promise((res) => res(channelcache.get(serverId)));
    }

    const query: Db.Servers[] = await globalThis.db.execute(readSql("@sql/servers/getServer.sql"), [serverId])[0];

    return new Promise((res, rej) => {
        if (query.length != 1) {
            rej("Not Registered");
        } else {
            channelcache.put(serverId, query[0].channel);
            res(query[0].channel);
        }
    });
};