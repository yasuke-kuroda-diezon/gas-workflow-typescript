import { BacklogService } from "src/service/backlog/BacklogService";
import { SlackService } from "src/service/slack/SlackService";

/**
 * シナリオケース: Backlog認証ユーザー情報を取得してSlackに通知する
 */
export class NotifyMyselfToSlack {
  private notifyMyselfToSlack() {
    const backlogService = BacklogService.get();
    const { name, mailAddress } = backlogService.getMyself();

    const slackService = SlackService.get();
    slackService.notify("認証済みユーザー情報", `${name} (${mailAddress})`);
  }

  static execute() {
    try {
      new NotifyMyselfToSlack().notifyMyselfToSlack();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
