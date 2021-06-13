import { PartialChannel, User } from "./interaction";

export interface message {
    content?: string;
    tts?: boolean;
    file?: unknown;
    embeds?: Embed[];
    payload_json?: unknown;
    allowed_mentions?: unknown; // TODO: implement https://discord.com/developers/docs/resources/channel#allowed-mentions-object
    message_reference?: unknown; // TODO: implement https://discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure
    components?: Component[];
}

interface Component {
    type: number;
    style?: number;
    label?: string;
    emoji?: unknown; // TODO: implement https://discord.com/developers/docs/interactions/message-components#component-object
    custom_id?: string;
    url?: string;
    disabled?: boolean;
    components?: Component[];
}

interface Embed {
    title?:       string;
    type?:        string;
    description?: string;
    url?:         string;
    timestamp?:   string;
    color?:       number;
    footer?:      Footer;
    image?:       Image;
    thumbnail?:   Thumbnail;
    video?:       Video;
    provider?:    Provider;
    author?:      Author;
    fields?:      Field[];
}

interface Footer {
    text:            string;
    icon_url?:       string;
    proxy_icon_url?: string;
}

interface Image {
    url?:       string;
    proxy_url?: string;
    height:     number;
    width:      number;
}

interface Thumbnail {
    url?:       string;
    proxy_url?: string;
    height:     number;
    width:      number;
}

interface Video {
    url?:       string;
    proxy_url?: string;
    height:     number;
    width:      number;
}

interface Provider {
    name?: string;
    url?:  string;
}

interface Author {
    name?:           string;
    url?:            string;
    icon_url?:       number;
    proxy_icon_url?: number;
}

interface Field {
    name:    string;
    value:   string;
    inline?: boolean;
}

export interface Role {
    id:          string;
    name:        string;
    color:       number;
    hoist:       boolean;
    position:    number;
    permissions: string;
    managed:     boolean;
    mentionable: boolean;
    tags?:       unknown; // TODO: implement role tags https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure
}

export interface Channel extends PartialChannel {
    guild_id:               string;
    position:               number;
    permission_overwrites?: Overwrite[];
    topic?:                 string;
    nsfw?:                  boolean;
    last_message_id?:       string;
    bitrate?:               number;
    user_limit?:            number;
    rate_limit_per_user:    number;
    recipients?:            User[];
    icon?:                  string;
    owner_id?:              string;
    parent_id?:             string;
    last_pin_timestamp?:    string;
    rtc_region?:            string;
    video_quality_mode?:    number;
    message_count?:         number;
    member_count?:          number;
    thread_metadata?:       unknown; // TODO: implement threads
    member?:                unknown; // TODO: implement threads
}

interface Overwrite {
    id:    string;
    type:  number;
    allow: string;
    deny:  string;
}