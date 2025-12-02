import { GmailPlayground } from "src/usecase/toGmail/GmailPlayground";
import { IssueKeyType } from "src/service/backlog/dto/BacklogDto";
import { NotifyIssueToSlack } from "src/usecase/toSlack/NotifyIssueToSlack";
import { NotifyMyActivitiesToSlack } from "src/usecase/toSlack/NotifyMyActivitiesToSlack";
import { NotifyMyselfToSlack } from "src/usecase/toSlack/NotifyMyselfToSlack";
import { NotifyUnreadMailCountToSlack } from "src/usecase/toSlack/NotifyUnreadMailCountToSlack";
import { SlackPlayground } from "src/usecase/toSlack/SlackPlayground";
import { WriteMyselfToSpreadsheet } from "src/usecase/toSpreadsheet/WriteMyselfToSpreadsheet";
import { ScheduleTriggerPlayground } from "src/usecase/schedule/ScheduleTriggerPlayground";

/**
 * entryPoints.
 */
function main() {
  // 定時処理トリガー登録動作確認.
  // ScheduleTriggerPlayground.execute();

  // gmail動作確認.
  GmailPlayground.execute();

  // slack動作確認.
  SlackPlayground.execute();

  // gmail動作確認
  NotifyUnreadMailCountToSlack.execute();

  // backlog動作確認
  NotifyIssueToSlack.execute(IssueKeyType.HZY_SHARED_1);
  NotifyMyActivitiesToSlack.execute();
  NotifyMyselfToSlack.execute();

  // spreadsheet動作確認
  WriteMyselfToSpreadsheet.execute();
}

interface Global {
  main: () => void;
}
declare const global: Global;
global.main = main;
