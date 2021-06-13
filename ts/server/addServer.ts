import * as Db from "res/types/database";
import { Interaction } from "res/types/interaction";

/**
 * Command ID of the /
 */
const addChannel = ""
const removeChannel = ""

export default (interaction: Interaction): void => {
    axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
        type: 5
    });

    // convert number to binary
    const bit = parseInt(interaction.member.permissions).toString(2);

    //  check if 6th bit is 1
    if (bit[(bit.length - 1) - 5] == "1") {
        // they have manage server permissions

        // validate if its a normal channel
        // TODO: this
        if ()

        axios.put(`/applications/${process.env.APPID}/guilds/${interaction.guild_id}/commands/${addChannel}/permissions`, {
            
        });
    }
}