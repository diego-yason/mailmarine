import { InteractionJson } from "res/types/interaction";

export default <InteractionJson>{
    name: "bot-admin",
    description: "All bot admin subcommands are found here.",
    options: [
        {
            type: 1,
            name: "delete-message",
            description: "Delete a specific message across the system",
            options: [
                {
                    type: 3,
                    name: "message-id",
                    description: "Message ID found in the bottom of the embed",
                    required: true
                }
            ]
        },
        {
            type: 2,
            name: "ban-user",
            description: "Restrict a user's ability to send message in the channel",
            options: [
                {
                    type: 1,
                    name: "no-expiry",
                    description: "Permanently ban someone",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "User to be banned",
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "expiry",
                    description: "Temporarily ban someone",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "User to be banned",
                            required: true
                        },
                        {
                            type: 4,
                            name: "time",
                            description: "Time in seconds to be banned (Go to admin server and use convertabot to convert time to seconds)",
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            type: 2,
            name: "ban-server",
            description: "Restrict a server's ability to talk in the system",
            options: [
                {
                    type: 1,
                    name: "no-expiry",
                    description: "Permanently ban a server",
                    options: [
                        {
                            type: 6,
                            name: "server",
                            description: "Server to be banned",
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "expiry",
                    description: "Temporarily ban a server",
                    options: [
                        {
                            type: 6,
                            name: "server",
                            description: "Server to be banned",
                            required: true
                        },
                        {
                            type: 4,
                            name: "time",
                            description: "Time in seconds to be banned",
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    default_permission: false
};