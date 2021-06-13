import * as Db from "res/types/database";
import { Interaction } from "res/types/interaction";

export default (interaction: Interaction): void => {
    axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
        type: 5
    });

    if (interaction.member.permissions)
}