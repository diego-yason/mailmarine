SELECT *
FROM bans
WHERE ? = true AND localid = ?
ORDER BY expiryDate DESC;