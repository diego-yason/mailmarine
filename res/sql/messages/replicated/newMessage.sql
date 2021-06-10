INSERT INTO replicated_message (messageid, server, originId)
VALUES (
    ?,
    (SELECT localid
        FROM servers
        WHERE serverid=?),
    ?
);