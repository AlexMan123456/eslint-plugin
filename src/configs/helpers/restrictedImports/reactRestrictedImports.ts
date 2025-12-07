import type { NoRestrictedImportsOptions } from "src/configs/helpers/restrictedImports/NoRestrictedImportsOptions";

import generalRestrictedImports from "src/configs/helpers/restrictedImports/generalRestrictedImports";

const reactRestrictedImports: NoRestrictedImportsOptions = {
  patterns: [
    ...(generalRestrictedImports.patterns ?? []),
    {
      message:
        'Please use `import Component from "@mui/[package]/Component"` instead. See https://mui.com/material-ui/guides/minimizing-bundle-size/ for more information.',
      regex: "^@mui/[^/]+$",
    },
  ],
};

export default reactRestrictedImports;
