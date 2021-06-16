SELECT snowflake
FROM channel
WHERE current=1 AND snowflake!=?;