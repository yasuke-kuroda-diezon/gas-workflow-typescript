import { BacklogService } from "src/service/backlog/BacklogService";
import { SlackService } from "src/service/slack/SlackService";

/**
 * シナリオケース: Backlog認証ユーザーのBacklogアクティビティを取得してSlackに通知する
 */
export class NotifyMyActivitiesToSlack {
  private notifyMyActivitiesToSlack() {
    const backlogService = BacklogService.get();
    const { id } = backlogService.getMyself();
    const result = backlogService.getUserActivities(id);

    if (result && result.length > 0) {
      const lines = result
        .filter(({ issueKey }) => !!issueKey) // 課題に関連するアクティビティのみ対象。Gitコミットなどのアクティビティを除外している。
        .map(({ content, issueKey }) => `${issueKey} ${content.summary}`);
      const message = lines.join("\n");

      const slackService = SlackService.get();
      slackService.notify("直近のアクティビティ", message);
    }
  }

  static execute() {
    try {
      new NotifyMyActivitiesToSlack().notifyMyActivitiesToSlack();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
