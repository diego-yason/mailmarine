import fs from "fs";
import child_process from "child_process";
import index from "../js/index.js";

fs.rmSync("../build", { recursive: true, force: true });
child_process.execSync(`cd res\n./build.sh\n`);
index();