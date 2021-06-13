import { InteractionJson } from "res/types/interaction";

export default <InteractionJson>{
    name: "owner-commands",
    description: "Commands only permitted to be used by the owner",
    options: [
        {
            type: 2,
            name: "admin-management",
            description: "Manage admins and their permissions",
            options: [
                {
                    type: 1,
                    name: "add",
                    description: "Add an admin to the system",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "User to be instated as admin",
                            required: true
                        },
                        {
                            type: 5,
                            name: "delete",
                            description: "Permitted to delete messages?",
                            required: true
                        },
                        {
                            type: 5,
                            name: "mute",
                            description: "Permitted to mute (temp-ban)?",
                            required: true
                        },
                        {
                            type: 5,
                            name: "unmute",
                            description: "Permitted to unmute (remove temp-ban)?",
                            required: true
                        },
                        {
                            type: 5,
                            name: "ban",
                            description: "Permitted to ban?",
                            required: true
                        },
                        {
                            type: 5,
                            name: "unban",
                            description: "Permitted to unban?",
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "modify",
                    description: "Modify an existing admin's permissions",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "Existing admin for permission change",
                            required: true
                        },
                        {
                            type: 5,
                            name: "mute",
                            description: "Permitted to mute (temp-ban)?"
                        },
                        {
                            type: 5,
                            name: "unmute",
                            description: "Permitted to unmute (remove temp-ban)?"
                        },
                        {
                            type: 5,
                            name: "ban",
                            description: "Permitted to ban?"
                        },
                        {
                            type: 5,
                            name: "unban",
                            description: "Permitted to unban?"
                        }
                    ]
                },
                {
                    type: 1,
                    name: "remove",
                    description: "Strip a user from adminship",
                    options: [
                        {
                            type: 6,
                            name: "user",
                            description: "User who will lose adminship",
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    default_permission: false
};