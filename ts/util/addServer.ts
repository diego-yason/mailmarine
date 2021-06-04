import { Connection } from "mysql";

const db: Connection = globalThis.db;

export default function(serverId: BigInt): void {
    db.query(
        `INSERT INTO servers (serverid)
        VALUES (${serverId});`);
}