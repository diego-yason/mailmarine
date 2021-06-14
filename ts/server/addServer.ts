import { Interaction, PartialGuildCommandPermission } from "res/types/interaction";
import * as everyoneCache from "memory-cache";
import { Role } from "res/types/discord";
import { type } from "os";

setInterval(() => {
    everyoneCache.clear();
}, globalThis.cacheTime);

/**
 * Command ID of the /assign command
 */
const addChannel = "853561712276275210";

/**
 * Command ID of the /
 */
const removeChannel = "";

export async function add(interaction: Interaction): Promise<void> {
    axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
        type: 5
    });

    // convert number to binary
    const bit = parseInt(interaction.member.permissions).toString(2);

    //  check if 6th bit is 1
    if (bit[(bit.length - 1) - 5] == "1") {
        // they have manage server permissions

        // validate if its a normal channel
        const [id, PartialChannel] = interaction.data.resolved.channels.entries();
        if (PartialChannel[1].type == 0) {

            // check if server exists on the db
            if (await db.query(readSql("/res/sql/servers/getServer.sql"), [interaction.guild_id])[1].length < 1) {
                // server doesn't exist yet, create server record and assume first channel
                db.query(readSql("/res/sql/servers/addServer.sql"), [interaction.guild_id]);
                db.query(readSql("/res/sql/channel/firstChannel.sql"));
            } else {
                // server already existed, assume second or more channel
                db.query(readSql("/res/sql/channel/replaceChannel.sql"));
            }

            // changing role permissions

            // everyone role ID is not in the cache
            if (!everyoneCache.get(interaction.guild_id)) {
                // get the everyone role from Discord
                const roles: Role[] = (await axios.get(`/guilds/${interaction.guild_id}/roles`)).data;

                everyoneCache.put(interaction.guild_id, (roles.filter((value) => value.name == "@everyone"))[0]);
            }


            axios.put(`/applications/${process.env.APPID}/guilds/${interaction.guild_id}/commands/permissions`, <PartialGuildCommandPermission[]>[
                {
                    id: addChannel,
                    permissions: [
                        {
                            id: everyoneCache.get(interaction.guild_id),
                            type: 1,
                            permission: false
                        }
                    ]
                },
                {
                    id: removeChannel,
                    permissions: [
                        {
                            id: everyoneCache.get(interaction.guild_id),
                            type: 1,
                            permission: true
                        }
                    ]
                }
            ]);
        } else {
            // wrong channel 
        }
    }
}