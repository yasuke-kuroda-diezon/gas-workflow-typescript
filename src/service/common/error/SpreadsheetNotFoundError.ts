import { EnvKey } from "src/service/common/EnvService";

/**
 * スプレッドシートが見つからない場合のエラー.
 */
export class SpreadsheetNotFoundError extends Error {
  constructor() {
    const message =
      `スプレッドシートが見つかりません。\n` +
      `スタンドアロン型の場合は環境変数${EnvKey.SPREAD_SHEET_ID}を設定してみてください。\n` +
      `コンテナバインド型の場合は、スプレッドシートを開いて再度実行してください。`;
    super(message);
    this.name = "SpreadsheetNotFoundError";
  }
}
