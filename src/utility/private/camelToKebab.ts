import type { IgnoreCase } from "@alextheman/utility";

import { camelToKebab as alexCamelToKebab, DataError } from "@alextheman/utility";

export type CamelToKebab<S extends string> = S extends `${IgnoreCase<"J">}avaScript${infer Rest}`
  ? Rest extends ""
    ? "-javascript"
    : `-javascript${CamelToKebab<Rest>}`
  : S extends `${IgnoreCase<"T">}ypeScript${infer Rest}`
    ? Rest extends ""
      ? "-typescript"
      : `-typescript${CamelToKebab<Rest>}`
    : S extends `${infer Head}${infer Tail}`
      ? Head extends Lowercase<Head>
        ? `${Head}${CamelToKebab<Tail>}`
        : `-${Lowercase<Head>}${CamelToKebab<Tail>}`
      : S;

function camelToKebab(string: string): string {
  if (string[0] === string[0].toUpperCase()) {
    throw new DataError(
      string,
      "CAMEL_TO_KEBAB_CONVERSION_ERROR",
      "camelCase string must start with a lowercase letter.",
    );
  }
  return alexCamelToKebab(
    string.replace(/[Tt]ypeScript/, "Typescript").replace(/[Jj]avaScript/, "Javascript"),
    { preserveConsecutiveCapitals: false },
  );
}

export default camelToKebab;
