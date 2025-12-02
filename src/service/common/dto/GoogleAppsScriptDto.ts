// Base
export type Blob = GoogleAppsScript.Base.Blob;
export type Ui = GoogleAppsScript.Base.Ui;
export type Menu = GoogleAppsScript.Base.Menu;
export type MenuAddItem = { caption: string; functionName: string };
export type MenuAddItems = MenuAddItem[];

// Gmail
export type GmailApp = GoogleAppsScript.Gmail.GmailApp;
export type GmailThread = GoogleAppsScript.Gmail.GmailThread;
export type GmailMessage = GoogleAppsScript.Gmail.GmailMessage;
export type GmailAdvancedOptions = GoogleAppsScript.Gmail.GmailAdvancedOptions;

// Spreadsheet
export type SpreadsheetApp = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
export type Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
export type Sheet = GoogleAppsScript.Spreadsheet.Sheet;

// URL_Fetch
export const HttpMethod = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PATCH: "patch",
  PUT: "put",
} as const;
export type HttpMethod = GoogleAppsScript.URL_Fetch.HttpMethod;
export type URLFetchRequestOptions =
  GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
export type UrlFetchApp = GoogleAppsScript.URL_Fetch.UrlFetchApp;
export type Payload = GoogleAppsScript.URL_Fetch.Payload;
export type HTTPResponse = GoogleAppsScript.URL_Fetch.HTTPResponse;

// Other
export type Byte = GoogleAppsScript.Byte;

export type Properties = GoogleAppsScript.Properties.Properties;
