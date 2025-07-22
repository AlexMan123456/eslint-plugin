import { name, version } from "package.json";
import rules from "src/rules";

const meta = {
  name,
  version,
  namespace: "alextheman",
};

export default { meta, rules };

export * from "src/configs";
