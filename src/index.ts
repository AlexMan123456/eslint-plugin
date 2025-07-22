import { name, version } from "package.json";
import rules from "src/rules";

export const meta = {
  name,
  version,
  namespace: "alextheman",
};

export { default as eslintConfig } from "eslint.config";
export default { rules };
