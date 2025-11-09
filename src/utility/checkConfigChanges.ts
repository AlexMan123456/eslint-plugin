import crypto from "crypto";
import fs from "fs";
import path from "path";

function getFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getFiles(fullPath);
    }
    return [fullPath];
  });
}

function hashFiles(files: string[]): string {
  const hash = crypto.createHash("sha256");
  for (const file of files) {
    hash.update(fs.readFileSync(file));
  }
  return hash.digest("hex");
}

const configFiles = getFiles(path.resolve("src/configs"));
const currentHash = hashFiles(configFiles);

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
