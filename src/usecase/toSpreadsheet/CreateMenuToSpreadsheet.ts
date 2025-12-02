import { SpreadsheetService } from "src/service/spreadsheet/SpreadsheetService";

/**
 * シナリオケース: スプレッドシートのUIメニューに項目を追加する。
 * メニュー名: aaa
 * 項目:
 *   - bbb -> ccc
 *   - ddd -> eee
 */
export class CreateMenuToSpreadsheet {
  private createMenuToSpreadsheet() {
    const spreadsheetService = SpreadsheetService.get();
    spreadsheetService.onOpen("aaa", [
      { caption: "bbb", functionName: "ccc" },
      { caption: "ddd", functionName: "eee" },
    ]);
  }

  static execute() {
    try {
      new CreateMenuToSpreadsheet().createMenuToSpreadsheet();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
