INSERT INTO channel (server, current, snowflake)
VALUES (
    (SELECT localid
     FROM servers
     WHERE serverid = ?)
    TRUE,
    ?
);