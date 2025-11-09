import type { IgnoreCase } from "@alextheman/utility";

import { camelToKebab as alexCamelToKebab } from "@alextheman/utility";

export type ToKebabCase<S extends string> = S extends `${IgnoreCase<"J">}avaScript${infer Rest}`
  ? Rest extends ""
    ? "javascript"
    : `javascript${ToKebabCase<Rest>}`
  : S extends `${IgnoreCase<"T">}ypeScript${infer Rest}`
    ? Rest extends ""
      ? "typescript"
      : `typescript${ToKebabCase<Rest>}`
    : S extends `${infer Head}${infer Tail}`
      ? Head extends Lowercase<Head>
        ? `${Head}${ToKebabCase<Tail>}`
        : `-${Lowercase<Head>}${ToKebabCase<Tail>}`
      : S;

function camelToKebab(string: string): string {
  return alexCamelToKebab(
    string.replace(/[Tt]ypeScript/, "typescript").replace(/[Jj]avaScript/, "javascript"),
  );
}

export default camelToKebab;
