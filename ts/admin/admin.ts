import * as Db from "res/types/database";
import { ButtonInteraction, Interaction } from "res/types/interaction";
import { message } from "res/types/discord";

const axios = globalThis.axios;

export const removeAdminResponse = (interaction: Interaction): void => {
    // REMINDME: this has to be tested
    axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
        type: 4,
        data: <message>{
            embeds: [
                {
                    description: "**WARNING**: You are about to remove an admin from the system. Confirm within 2 mins.",
                    color: 15885155,
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "MailMarine by KingMarine#5676"
                    },
                    fields: [
                        {
                            name: "Admin being removed:",
                            value: `<@${interaction.data.options[0].value}>`
                        }
                    ]
                }
            ],
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 2,
                            label: "No",
                            custom_id: "no"
                        },
                        {
                            type: 2,
                            style: 4,
                            label: "Yes",
                            custom_id: "yes"
                        }
                    ]
                }
            ]
        }
    });
};

export const removeAdminConfirm = (interaction: ButtonInteraction): void => {
    if (interaction.member.user.id == process.env.ID) {
        // TODO: make button response
    } 
}