import { createHash } from "crypto";
import { readdirSync, readFileSync } from "fs";
import path from "path";

function getFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getFiles(fullPath);
    }
    return [fullPath];
  });
}

function hashFiles(files: string[]): string {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(readFileSync(file));
  }
  return hash.digest("hex");
}

function hashConfigFiles() {
  return hashFiles(getFiles(path.resolve("src/configs")));
}

export default hashConfigFiles;
