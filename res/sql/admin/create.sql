INSERT INTO moderation (
    userid,
    delete,
    mute,
    unmute,
    ban,
    unban
  )
VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
  );