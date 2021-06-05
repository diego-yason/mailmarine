"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = globalThis.db;
function default_1(serverId) {
    db.query(`INSERT INTO servers (serverid)
        VALUES (${serverId});`);
}
exports.default = default_1;
//# sourceMappingURL=addServer.js.map