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