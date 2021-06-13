import { InteractionJson } from "res/types/interaction";

export default <InteractionJson>{
    name: "assign",
    description: "Assign a channel to the Cross-Server message system.",
    options: [
        {
            name: "channel",
            description: "Channel that will be used for CSMS.",
            type: 7,
            required: true
        }
    ]
};