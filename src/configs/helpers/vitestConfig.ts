import type { VitestEnvironment } from "vitest/node";

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

function vitestConfig(environment: VitestEnvironment = "jsdom") {
  return defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment,
      globals: true,
      include: ["**/tests/**/*.test.ts"],
    },
  });
}

export default vitestConfig;
