import { BacklogService } from "src/service/backlog/BacklogService";
import { SpreadsheetService } from "src/service/spreadsheet/SpreadsheetService";

/**
 * シナリオケース: Backlog認証ユーザー情報を取得してSpreadsheetに書き込む
 * A1セル：名前
 * B1セル：メールアドレス
 */
export class WriteMyselfToSpreadsheet {
  private writeMyselfToSpreadsheet() {
    const backlogService = BacklogService.get();
    const { name, mailAddress } = backlogService.getMyself();

    const spreadsheetService = SpreadsheetService.get();
    spreadsheetService.setValue("A1", name);
    spreadsheetService.setValue("B1", mailAddress);
  }

  static execute() {
    try {
      new WriteMyselfToSpreadsheet().writeMyselfToSpreadsheet();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
