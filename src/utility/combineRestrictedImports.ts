import type { NoRestrictedImportsOptions } from "src/configs/helpers";

import { omitProperties } from "@alextheman/utility";

function combineRestrictedImports(
  firstGroup: NoRestrictedImportsOptions,
  secondGroup: NoRestrictedImportsOptions,
): NoRestrictedImportsOptions {
  const combinedGroup = {
    paths: [...(firstGroup.paths ?? []), ...(secondGroup.paths ?? [])],
    patterns: [...(firstGroup.patterns ?? []), ...(secondGroup.patterns ?? [])],
  };

  if (combinedGroup.paths.length === 0) {
    return omitProperties(combinedGroup, "paths");
  }
  if (combinedGroup.patterns.length === 0) {
    return omitProperties(combinedGroup, "patterns");
  }
  return combinedGroup;
}

export default combineRestrictedImports;
