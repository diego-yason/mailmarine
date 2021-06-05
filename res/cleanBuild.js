/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */

import fs from "fs";
import child_process from "child_process";
import bot from "../js/index.js";

fs.rmSync("../build", { recursive: true, force: true });
child_process.execSync(`cd ${__dirname}\n./build.sh\n`);
bot();