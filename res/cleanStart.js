import fs from "fs";
import child_process from "child_process";
import index from "../js/test.js";

fs.rmSync("@root/build", { recursive: true, force: true });
child_process.exec(`./build.sh`);
index();