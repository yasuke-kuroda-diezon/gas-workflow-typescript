import { ColorType } from "src/service/common/ColorType";
import { SlackService } from "src/service/slack/SlackService";

/**
 * シナリオケース: Slack通知の動作確認用Playground.
 *
 */
export class SlackPlayground {
  private slackPlayground() {
    const slackService = SlackService.get();
    slackService.sendText("hi there!!");
    slackService.sendText("sent by TypeScript GAS workflow");

    slackService.notify("infoタイトル", "infoです");
    slackService.notify("infoタイトル", "緑色です", ColorType.GREEN);
    slackService.notify("infoタイトル", "黒色です", ColorType.BLACK);

    slackService.notifySuccess("成功タイトル", "success!");
    slackService.notifyFailure("失敗タイトル", "failure...");
  }

  static execute() {
    try {
      new SlackPlayground().slackPlayground();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
