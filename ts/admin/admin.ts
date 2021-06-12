import { ButtonInteraction, Interaction } from "res/types/interaction";
import { message } from "res/types/discord";

const axios = globalThis.axios;
const readsql = globalThis.readSql;

export const removeAdminResponse = (interaction: Interaction): void => {
    // REMINDME: this has to be tested
    axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
        type: 4,
        data: <message>{
            embeds: [
                {
                    description: "**WARNING**: You are about to remove an admin from the system. Confirm within 2 mins.",
                    color: 14928484,
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
                            custom_id: interaction.data.options[0].value
                        }
                    ]
                }
            ]
        }
    });
};

export const removeAdminConfirm = (interaction: ButtonInteraction): void => {
    if (interaction.member.user.id == process.env.ID) {
        const message = interaction.message.embeds[0];

        interaction.message.components.forEach(comp => {
            comp.disabled = true;
        });

        interaction.message.components.forEach((val) => {
            val.disabled = true;
        });

        if (interaction.data.custom_id != "no") {
            // confirmed

            message.color = 7725157;
            message.description = `✅ **Complete. Changes confirmed**\n~~${message.description}~~`;

            axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
                type: 4,
                data: interaction.message
            });

            db.query(readsql("/res/sql/admin/delete.sql"), [interaction.data.custom_id]); // TODO make query
        } else {
            // cancelled

            message.color = 15556961;
            message.description = `❌ **Rejected. Changes undone.**\n~~${message.description}~~`;

            axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
                type: 4,
                data: interaction.message
            });
        }
    }
};

export const addAdmin = (interaction: Interaction): void => {
    axios.post(`/interactions/${interaction.id}/${interaction.token}/callback`, {
        type: 5
    });

    const options = interaction.data.options;

    db.query(readsql("/res/sql/admin/create.sql"), [options[0].value, options[0].value, options[1].value, options[2].value, options[3].value, options[4].value, options[5].value]).then(() => {
        axios.patch(`/webhooks/${process.env.APPID}/${interaction.token}/messages/@original`, {
            content: `UserID ${options[0].value} has been added as an admin.`
        });
    });
};