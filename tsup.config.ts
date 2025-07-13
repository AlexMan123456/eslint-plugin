import { defineConfig } from "tsup";
import packageInfo from "./package.json"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    ...Object.keys(packageInfo.peerDependencies)
  ]
});
