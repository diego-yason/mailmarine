INSERT INTO origin_message (messageid, server_origin, author)
VALUES (
    ?,
    (SELECT localid
        FROM servers
        WHERE serverid=?),
    (SELECT localid
        FROM users
        WHERE localid=?)
)