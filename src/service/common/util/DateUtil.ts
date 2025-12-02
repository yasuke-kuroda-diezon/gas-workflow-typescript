export class DateUtil {
  /**
   * todo: Utilities.formatDate(Day,"JST","yyyy/MM/dd");の形で簡易にできないか検討する.
   *
   * UTCの日付文字列をJSTに変換してyyyy-mm-dd形式で返す
   * @param utcDateString ISO形式のUTC日付文字列
   * @returns yyyy-mm-dd形式のJST日付
   */
  static formatToJstDate(utcDateString) {
    if (!utcDateString) return "";
    const date = new Date(utcDateString);
    const jstTime = date.getTime() + 9 * 60 * 60 * 1000;
    const jst = new Date(jstTime);

    const yyyy = jst.getUTCFullYear();
    const mm = String(jst.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(jst.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
}
