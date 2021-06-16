SELECT @server_local := localid
                        FROM servers
                        WHERE serverid=?;

INSERT INTO replicated_message (messageid, server, originId, channel)
VALUES (
    ?,
    @server_local
    ?,
    (SELECT id
        FROM channel
        WHERE current=1 AND server=@server_local) 
);