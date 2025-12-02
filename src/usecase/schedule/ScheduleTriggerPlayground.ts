/**
 * シナリオケース: 定時トリガーの動作確認用Playground.
 */
export class ScheduleTriggerPlayground {
  sampleFunction() {
    console.log("hi there!");
  }

  private scheduleTriggerRegistrar() {
    //毎週日曜の午前4~5時に繰り返し定期実行するトリガーを作成
    ScriptApp.newTrigger("sampleFunction")
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
      .atHour(4)
      .create();

    // 毎日8時に sampleFunction を実行するトリガーを登録
    ScriptApp.newTrigger("sampleFunction")
      .timeBased()
      .atHour(8)
      .everyDays(1)
      .create();

    // 毎時 1時間おきに sampleFunction を実行するトリガーを登録
    ScriptApp.newTrigger("sampleFunction").timeBased().everyHours(1).create();

    // クリーンアップ。作ったトリガーを削除。
    this.removeSampleFunctionTriggers();
  }

  private removeSampleFunctionTriggers() {
    const triggers = ScriptApp.getProjectTriggers();
    for (const trigger of triggers) {
      if (
        trigger.getHandlerFunction &&
        trigger.getHandlerFunction() === "sampleFunction"
      ) {
        ScriptApp.deleteTrigger(trigger);
      }
    }
  }

  static execute() {
    try {
      new ScheduleTriggerPlayground().scheduleTriggerRegistrar();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
