import fs from "fs";
import path from "path";

import hashFiles, { getFiles } from "src/utility/hashFiles";

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
