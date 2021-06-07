/* eslint-disable @typescript-eslint/no-var-requires */
const mysql = require("mysql2");

describe("Messages", () => {
    const db = mysql.createPool({
        connectionLimit: 2
    });

    it("creates a message to the system", async () => {
        expect(true).toBe(true);
    });

    it.todo("distributes the message to the other servers");

});