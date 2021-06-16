import { Interaction, PartialGuildCommandPermission } from "res/types/interaction";
import { Channel, message, Role } from "res/types/discord";

const everyoneCache = new Map<string, string>();

setInterval(() => {
    everyoneCache.clear();
}, globalThis.cacheTime);

/**
 * Command ID of the /assign command
 */
const addChannel = "853561712276275210";

/**
 * Command ID of the /unassign command
 */
const removeChannel = "853990674105761842";

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
        const [PartialChannel] = interaction.data.resolved.channels.entries();
        if (PartialChannel[1].type == 0) {

            // permission check
            const channel: Channel = (await axios.get(`/channels/${PartialChannel[1].id}`)).data;

            const permBits = parseInt(channel.permission_overwrites.filter(value => value.id == "850002815103139892")[0].allow).toString(2);

            if (permBits[(permBits.length - 1) - 4] != "1") {
                // no perms
                axios.patch(`/webhooks/${process.env.APPID}/${interaction.token}/messages/@original`, <Omit<message, "tts">>{
                    content: readFile("/res/errors/no_perms.txt")
                });
            }
            // check if server exists on the db
            if (await db.query(readFile("/res/sql/servers/getServer.sql"), [interaction.guild_id])[1].length < 1) {
                // server doesn't exist yet, create server record and assume first channel
                db.query(readFile("/res/sql/servers/addServer.sql"), [interaction.guild_id]);
                db.query(readFile("/res/sql/channel/firstChannel.sql"));
            } else {
                // server already existed, assume second or more channel
                db.query(readFile("/res/sql/channel/replaceChannel.sql"));
            }

            // changing role permissions

            // everyone role ID is not in the cache
            if (!everyoneCache.get(interaction.guild_id)) {
                // get the everyone role from Discord
                const roles: Role[] = (await axios.get(`/guilds/${interaction.guild_id}/roles`)).data;

                everyoneCache.set(interaction.guild_id, (roles.filter((value) => value.name == "@everyone"))[0].id);
            }


            await axios.put(`/applications/${process.env.APPID}/guilds/${interaction.guild_id}/commands/permissions`, <PartialGuildCommandPermission[]>[
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

            axios.patch(`/webhooks/${process.env.APPID}/${interaction.token}/messages/@original`, <Omit<message, "tts">>{
                content: "Channel is now in the CSM-System. Please keep the required permissions as is, modification may cause disconnection from the system."
            });
        } else {
            axios.patch(`/webhooks/${process.env.APPID}/${interaction.token}/messages/@original`, <Omit<message, "tts">>{
                content: "Apologies, you don't have the right server permission to use this command.\nRequired permission: Manage Server."
            });
        }
    }
}