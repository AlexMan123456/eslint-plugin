interface RestrictedPathImportBase {
  message: string;
  name: string;
  allowTypeImports?: boolean;
}

interface RestrictedPathImportImportNames extends RestrictedPathImportBase {
  importNames: string[];
  allowImportNames?: never;
}

interface RestrictedPathImportAllowImportNames extends RestrictedPathImportBase {
  allowImportNames: string[];
  importNames?: never;
}

export type RestrictedPathImport =
  | RestrictedPathImportBase
  | RestrictedPathImportImportNames
  | RestrictedPathImportAllowImportNames;

interface RestrictedPatternImportBase {
  caseSensitive?: boolean;
  message: string;
  allowTypeImports?: boolean;
}

interface RestrictedPatternImportGroup extends RestrictedPatternImportBase {
  group: string[];
  regex?: never;
}

interface RestrictedPatternImportRegex extends RestrictedPatternImportBase {
  regex: string;
  group?: never;
}

interface RestrictedPatternImportImportNames extends RestrictedPatternImportBase {
  importNames: string[];
  allowImportNames?: never;
  importNamePattern?: never;
  allowImportNamePattern?: never;
}

interface RestrictedPatternImportAllowImportNames extends RestrictedPatternImportBase {
  importNames?: never;
  allowImportNames: string[];
  importNamePattern?: never;
  allowImportNamePattern?: never;
}

interface RestrictedPatternImportImportNamePattern extends RestrictedPatternImportBase {
  importNames?: never;
  allowImportNames?: never;
  importNamePattern: string;
  allowImportNamePattern?: never;
}
interface RestrictedPatternImportAllowImportNamePattern extends RestrictedPatternImportBase {
  importNames?: never;
  allowImportNames?: never;
  importNamePattern?: never;
  allowImportNamePattern: string;
}

export type RestrictedPatternImport =
  | RestrictedPatternImportGroup
  | RestrictedPatternImportRegex
  | RestrictedPatternImportImportNames
  | RestrictedPatternImportAllowImportNames
  | RestrictedPatternImportImportNamePattern
  | RestrictedPatternImportAllowImportNamePattern;

interface NoRestrictedImportsOptionsPathsOnly {
  paths: RestrictedPathImport[];
  patterns?: never;
}

interface NoRestrictedImportsOptionsPatternsOnly {
  paths?: never;
  patterns: RestrictedPatternImport[];
}

interface NoRestrictedImportsOptionsPathsAndPatterns {
  paths: RestrictedPathImport[];
  patterns: RestrictedPatternImport[];
}

/**
 * Options for the built-in ESLint `no-restricted-imports` rule.
 *
 *  @category Rule Options
 */
export type NoRestrictedImportsOptions =
  | NoRestrictedImportsOptionsPathsOnly
  | NoRestrictedImportsOptionsPatternsOnly
  | NoRestrictedImportsOptionsPathsAndPatterns;
