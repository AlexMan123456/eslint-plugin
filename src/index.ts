import { name, version } from "package.json";
import rules from "src/rules";

export const meta = {
  name,
  version,
  namespace: "alextheman",
};

export default { rules };

export * from "src/configs";
