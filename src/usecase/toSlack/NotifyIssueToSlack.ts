import { BacklogService } from "src/service/backlog/BacklogService";
import { IssueIdOrKeyType } from "src/service/backlog/dto/BacklogDto";
import { SlackService } from "src/service/slack/SlackService";

/**
 * シナリオケース: 指定keyのBacklog課題を取得して概要をSlackに通知する
 */
export class NotifyIssueToSlack {
  private notifyIssueToSlack(issueIdOrKey: IssueIdOrKeyType) {
    const backlogService = BacklogService.get();
    const {
      issueKey,
      summary,
      assignee: { name },
      dueDate,
    } = backlogService.getIssue(issueIdOrKey);

    const slackService = SlackService.get();
    slackService.notify(
      "課題情報",
      `${issueKey}\nタイトル: ${summary}\n担当者: ${name}\n期限日: ${dueDate}`,
    );
  }

  static execute(issueIdOrKey: IssueIdOrKeyType) {
    try {
      new NotifyIssueToSlack().notifyIssueToSlack(issueIdOrKey);
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
