import { Properties } from "src/service/common/dto/GoogleAppsScriptDto";

/** 環境変数key一覧 */
export const EnvKey = {
  BACKLOG_DOMAIN: "BACKLOG_DOMAIN",
  BACKLOG_API_KEY: "BACKLOG_API_KEY",
  SLACK_WEBHOOK_URL: "SLACK_WEBHOOK_URL",
  SPREAD_SHEET_ID: "SPREAD_SHEET_ID",
} as const;

export type EnvKey = (typeof EnvKey)[keyof typeof EnvKey];

/**
 * 環境変数を取得するサービス.
 */
export class EnvService {
  private static getScriptProperties(): Properties {
    return PropertiesService.getScriptProperties(); // PropertiesService is built-in class. see: https://developers.google.com/apps-script/reference/properties?hl=ja
  }

  /**
   * キーの設定箇所 > https://diezon.gyazo.com/88b474009685d23c9a4dbbd6f2d93440
   */
  static get(key: string): string | null {
    return this.getScriptProperties().getProperty(key);
  }
}
