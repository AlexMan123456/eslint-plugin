import { camelToKebab as alexCamelToKebab } from "@alextheman/utility";

function camelToKebab(string: string): string {
  return alexCamelToKebab(
    string.replace(/[Tt]ypeScript/, "typescript").replace(/[Jj]avaScript/, "javascript"),
  );
}

export default camelToKebab;
