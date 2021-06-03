/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */

require("fs").rmSync("../build", { recursive: true, force: true });
require("child_process").execSync(`cd ${__dirname}\n./build.sh\n`);
require("../js/index.js").start();