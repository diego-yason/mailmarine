SELECT snowflake
FROM channel
WHERE current=1 AND server!=(SELECT localid
                                FROM servers
                                WHERE serverid=?);