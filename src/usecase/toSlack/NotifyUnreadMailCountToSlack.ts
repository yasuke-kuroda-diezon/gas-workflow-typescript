import { GmailService } from "src/service/gmail/GmailService";
import { SlackService } from "src/service/slack/SlackService";

/**
 * シナリオケース: Gmailの未読メール件数を集計してSlackに通知する.
 */
export class NotifyUnreadMailCountToSlack {
  private notifyUnreadMailCountToSlack() {
    const gmailService = GmailService.get();
    const count = gmailService.getUnreadMessageCount();

    const slackService = SlackService.get();
    slackService.notify("未読メール通知", `${count}件の未読メールがあります!`);
  }

  static execute() {
    try {
      new NotifyUnreadMailCountToSlack().notifyUnreadMailCountToSlack();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
