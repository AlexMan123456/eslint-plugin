import fs from "fs";
import path from "path";

import hashConfigFiles from "src/utility/hashConfigChanges";

const currentHash = hashConfigFiles();

const hashFile = path.resolve(".config-hash");
const previousHash = fs.existsSync(hashFile) ? fs.readFileSync(hashFile, "utf-8") : null;

if (currentHash === previousHash) {
  console.info("Configs unchanged. Skipping build.");
  process.exit(0);
} else {
  fs.writeFileSync(hashFile, currentHash);
  console.info("Configs changed. Running build...");
  process.exit(1);
}
