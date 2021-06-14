SET @local := (SELECT localid FROM servers WHERE serverid = ?);

UPDATE channel
SET current = 0
WHERE server = @local AND current = 1;

INSERT INTO channel (server, snowflake)
VALUES (
    @local,
    ?
  );