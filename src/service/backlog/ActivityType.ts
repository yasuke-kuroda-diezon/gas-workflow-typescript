export const ActivityTypeList = {
  ADD_ISSUE: "ADD_ISSUE",
  UPDATE_ISSUE: "UPDATE_ISSUE",
  COMMENT_ISSUE: "COMMENT_ISSUE",
  DELETE_ISSUE: "DELETE_ISSUE",
  ADD_WIKI: "ADD_WIKI",
  UPDATE_WIKI: "UPDATE_WIKI",
  DELETE_WIKI: "DELETE_WIKI",
  ADD_FILE: "ADD_FILE",
  UPDATE_FILE: "UPDATE_FILE",
  DELETE_FILE: "DELETE_FILE",
  SVN_COMMIT: "SVN_COMMIT",
  GIT_PUSH: "GIT_PUSH",
  CREATE_GIT_REPO: "CREATE_GIT_REPO",
  BULK_UPDATE_ISSUE: "BULK_UPDATE_ISSUE",
  JOIN_PROJECT: "JOIN_PROJECT",
  LEAVE_PROJECT: "LEAVE_PROJECT",
  ADD_COMMENT_NOTIFICATION: "ADD_COMMENT_NOTIFICATION",
  ADD_PULL_REQUEST: "ADD_PULL_REQUEST",
  UPDATE_PULL_REQUEST: "UPDATE_PULL_REQUEST",
  COMMENT_PULL_REQUEST: "COMMENT_PULL_REQUEST",
  DELETE_PULL_REQUEST: "DELETE_PULL_REQUEST",
  ADD_MILESTONE: "ADD_MILESTONE",
  UPDATE_MILESTONE: "UPDATE_MILESTONE",
  DELETE_MILESTONE: "DELETE_MILESTONE",
  GROUP_JOIN_PROJECT: "GROUP_JOIN_PROJECT",
  GROUP_LEAVE_PROJECT: "GROUP_LEAVE_PROJECT",
};
export type ActivityTypeList =
  (typeof ActivityTypeList)[keyof typeof ActivityTypeList];

export type ActivityId = number;
export type ActivityKey = string;
export type ActivityDescription = string;
export type ActivityType = {
  id: ActivityId;
  key: ActivityKey;
  description: ActivityDescription;
};
export const ActivityTypes = [
  { id: 1, key: "ADD_ISSUE", description: "課題を追加" },
  { id: 2, key: "UPDATE_ISSUE", description: "課題を更新" },
  { id: 3, key: "COMMENT_ISSUE", description: "課題にコメント" },
  { id: 4, key: "DELETE_ISSUE", description: "課題の削除" },
  { id: 5, key: "ADD_WIKI", description: "Wikiを追加" },
  { id: 6, key: "UPDATE_WIKI", description: "Wikiを更新" },
  { id: 7, key: "DELETE_WIKI", description: "Wikiを削除" },
  { id: 8, key: "ADD_FILE", description: "共有ファイルを追加" },
  { id: 9, key: "UPDATE_FILE", description: "共有ファイルを更新" },
  { id: 10, key: "DELETE_FILE", description: "共有ファイルを削除" },
  { id: 11, key: "SVN_COMMIT", description: "Subversionコミット" },
  { id: 12, key: "GIT_PUSH", description: "GITプッシュ" },
  { id: 13, key: "CREATE_GIT_REPO", description: "GITリポジトリ作成" },
  { id: 14, key: "BULK_UPDATE_ISSUE", description: "課題をまとめて更新" },
  { id: 15, key: "JOIN_PROJECT", description: "プロジェクトに参加" },
  { id: 16, key: "LEAVE_PROJECT", description: "プロジェクトから脱退" },
  {
    id: 17,
    key: "ADD_COMMENT_NOTIFICATION",
    description: "コメントにお知らせを追加",
  },
  { id: 18, key: "ADD_PULL_REQUEST", description: "プルリクエストの追加" },
  { id: 19, key: "UPDATE_PULL_REQUEST", description: "プルリクエストの更新" },
  {
    id: 20,
    key: "COMMENT_PULL_REQUEST",
    description: "プルリクエストにコメント",
  },
  { id: 21, key: "DELETE_PULL_REQUEST", description: "プルリクエストの削除" },
  { id: 22, key: "ADD_MILESTONE", description: "マイルストーンの追加" },
  { id: 23, key: "UPDATE_MILESTONE", description: "マイルストーンの更新" },
  { id: 24, key: "DELETE_MILESTONE", description: "マイルストーンの削除" },
  {
    id: 25,
    key: "GROUP_JOIN_PROJECT",
    description: "グループがプロジェクトに参加",
  },
  {
    id: 26,
    key: "GROUP_LEAVE_PROJECT",
    description: "グループがプロジェクトから脱退",
  },
];
export type ActivityTypes = ActivityType[];

export function getDescriptionByActivityId(
  activityId: ActivityId,
): ActivityDescription | undefined {
  return Object.values(ActivityTypes).find(
    (ActivityType) => ActivityType.id === activityId,
  )?.description;
}
