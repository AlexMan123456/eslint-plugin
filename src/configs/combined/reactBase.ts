import type { Linter } from "eslint";

import reactBase from "src/configs/general/reactBase";
import personalReactBaseConfig from "src/configs/personal/reactBase";

const combinedReactBaseConfig: Linter.Config[] = [...reactBase, ...personalReactBaseConfig];

export default combinedReactBaseConfig;
