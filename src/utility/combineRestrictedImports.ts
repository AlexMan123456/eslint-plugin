import type { NoRestrictedImportsOptions } from "src/configs/helpers";

import { omitProperties } from "@alextheman/utility";

function combineRestrictedImports(
  ...groups: NoRestrictedImportsOptions[]
): NoRestrictedImportsOptions {
  const paths: NoRestrictedImportsOptions["paths"] = [];
  const patterns: NoRestrictedImportsOptions["patterns"] = [];

  for (const group of groups) {
    if (group.paths) {
      paths.push(...group.paths);
    }
    if (group.patterns) {
      patterns.push(...group.patterns);
    }
  }

  const combinedGroup = { paths, patterns };

  if (combinedGroup.paths.length === 0) {
    return omitProperties(combinedGroup, "paths");
  }
  if (combinedGroup.patterns.length === 0) {
    return omitProperties(combinedGroup, "patterns");
  }
  return combinedGroup;
}

export default combineRestrictedImports;
