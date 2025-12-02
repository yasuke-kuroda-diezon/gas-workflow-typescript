import { AbstractBacklogService } from "src/service/backlog/AbstractBacklogService";
import {
  GetIssueResponse,
  IdType,
  IssueIdOrKeyType,
} from "src/service/backlog/dto/BacklogDto";
import { EnvKey, EnvService } from "src/service/common/EnvService";
import { HttpClient } from "src/service/common/HttpClient";
import { DateUtil } from "src/service/common/util/DateUtil";
import { DEFAULT_PER_PAGE } from "src/service/common/Paginated";
import {
  ActivityTypeList,
  ActivityTypes,
  getDescriptionByActivityId,
} from "src/service/backlog/ActivityType";
import { EnvNotFoundError } from "src/service/common/error/EnvNotFoundError";

/**
 * Backlog関連のサービス.
 */
export class BacklogService extends AbstractBacklogService {
  constructor(
    backlogDomain: string | null,
    backlogApiKey: string | null,
    httpClient: HttpClient
  ) {
    if (!backlogDomain || backlogDomain === "null") {
      throw new EnvNotFoundError(EnvKey.BACKLOG_DOMAIN);
    }
    if (!backlogApiKey || backlogApiKey === "null") {
      throw new EnvNotFoundError(EnvKey.BACKLOG_API_KEY);
    }
    super(backlogDomain, backlogApiKey, httpClient);
  }

  static get() {
    return new BacklogService(
      EnvService.get(EnvKey.BACKLOG_DOMAIN),
      EnvService.get(EnvKey.BACKLOG_API_KEY),
      new HttpClient()
    );
  }

  /**
   * 認証ユーザー情報の取得
   * GET /api/v2/users/myself
   * see: https://developer.nulab.com/ja/docs/backlog/api/2/get-own-user/
   */
  getMyself() {
    const uri = this.buildUri("/api/v2/users/myself");
    const response = this.httpClient.get(uri);
    const { id, userId, name, mailAddress } = response;
    return { id, userId, name, mailAddress };
  }

  /**
   * 課題情報の取得
   * GET /api/v2/issues/:issueIdOrKey
   * see: https://developer.nulab.com/ja/docs/backlog/api/2/get-issue/
   */
  getIssue(issueIdOrKey: IssueIdOrKeyType): GetIssueResponse {
    const uri = this.buildUri(`/api/v2/issues/${issueIdOrKey}`);
    const response = this.httpClient.get(uri);
    const {
      issueKey,
      summary,
      assignee: { userId, name },
      dueDate,
    } = response;
    const jstDueDate = dueDate ? DateUtil.formatToJstDate(dueDate) : "";
    return {
      issueKey,
      summary,
      assignee: { userId, name },
      dueDate: jstDueDate,
    };
  }

  /**
   * アクティビティの取得
   * GET /api/v2/users/:userId/activities
   * see: https://developer.nulab.com/ja/docs/backlog/api/2/get-user-recent-updates/
   */
  getUserActivities(userId: IdType) {
    const allowedActivityTypeKeys: ActivityTypeList[] = [
      ActivityTypeList.ADD_ISSUE,
      ActivityTypeList.UPDATE_ISSUE,
      ActivityTypeList.COMMENT_ISSUE,
      ActivityTypeList.DELETE_ISSUE,
      ActivityTypeList.ADD_WIKI,
      ActivityTypeList.UPDATE_WIKI,
      ActivityTypeList.DELETE_WIKI,
      ActivityTypeList.ADD_FILE,
      ActivityTypeList.UPDATE_FILE,
      ActivityTypeList.DELETE_FILE,
      ActivityTypeList.SVN_COMMIT,
      ActivityTypeList.GIT_PUSH,
      ActivityTypeList.CREATE_GIT_REPO,
      ActivityTypeList.BULK_UPDATE_ISSUE,
      ActivityTypeList.JOIN_PROJECT,
      ActivityTypeList.LEAVE_PROJECT,
      ActivityTypeList.ADD_COMMENT_NOTIFICATION,
    ];
    const allowedActivityTypes = ActivityTypes.filter((ActivityType) =>
      allowedActivityTypeKeys.includes(ActivityType.key)
    );
    const allowedActivityTypeIds = allowedActivityTypes.map(
      (ActivityType) => ActivityType.id
    );

    const query = {
      count: DEFAULT_PER_PAGE,
      "activityTypeId[]": allowedActivityTypeIds,
    };
    const uri = this.buildUri(`/api/v2/users/${userId}/activities`, query);
    const response = this.httpClient.get(uri);
    const result = response.map((activity) => {
      return {
        project: {
          projectKey: activity.project.projectKey,
        },
        activityDescription: getDescriptionByActivityId(activity.type),
        ...(activity.content.id && {
          content: {
            key_id: activity.content.key_id,
            summary: activity.content.summary,
          },
        }),
        ...(activity.content.key_id && {
          issueKey: `${activity.project.projectKey}-${activity.content.key_id}`,
        }),
      };
    });
    return result;
  }
}
