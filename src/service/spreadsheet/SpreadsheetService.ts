import { Sheet } from "src/service/common/dto/GoogleAppsScriptDto";
import { AbstractSpreadsheetService } from "src/service/spreadsheet/AbstractSpreadsheetService";

/**
 * Spreadsheet関連のサービス.
 */
export class SpreadsheetService extends AbstractSpreadsheetService {
  static get() {
    return new SpreadsheetService();
  }

  /** 指定セル範囲に値を書き込む。 */
  setValue(a1Notation: string, value: any) {
    const sheet: Sheet = this.getActiveSpreadsheet().getActiveSheet();
    sheet.getRange(a1Notation).setValue(value);
  }
}
