import path from "path";

function normalizeImportPath(importPath: string): string {
  const normalizedPath = path.posix.normalize(importPath);
  if (importPath.startsWith("./") && !normalizedPath.startsWith("./")) {
    return `./${normalizedPath}`;
  }
  return normalizedPath;
}

export default normalizeImportPath;
