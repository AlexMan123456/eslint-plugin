import fs from "node:fs";
import path from "node:path";

import hashFiles, { getFiles } from "src/utility/private/hashFiles";

const currentHash = hashFiles(getFiles(path.resolve("src/configs")));

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
