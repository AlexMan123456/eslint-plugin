import { name, version } from "package.json";
import rules from "src/rules";

const plugin = {
  meta: {
    name,
    version,
    namespace: "alextheman",
  },
  configs: {},
  rules,
};

export default plugin;
