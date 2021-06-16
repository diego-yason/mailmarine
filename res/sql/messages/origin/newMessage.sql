INSERT INTO origin_message (messageid, server_origin, author, channel)
VALUES (
    ?,
    (SELECT localid
        FROM servers
        WHERE serverid=?),
    (SELECT localid
        FROM users
        WHERE localid=?),
    (SELECT id
        FROM channel
        WHERE snowflake=?)
);