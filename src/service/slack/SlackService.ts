import { ColorType } from "src/service/common/ColorType";
import { EnvKey, EnvService } from "src/service/common/EnvService";
import { HttpClient } from "src/service/common/HttpClient";
import { AbstractSlackService } from "src/service/slack/AbstractSlackService";
import { EnvNotFoundError } from "src/service/common/error/EnvNotFoundError";

/**
 * Slack関連のサービス.
 */
export class SlackService extends AbstractSlackService {
  constructor(webhookUrl: string | null, httpClient: HttpClient) {
    if (!webhookUrl || webhookUrl === "null") {
      throw new EnvNotFoundError(EnvKey.SLACK_WEBHOOK_URL);
    }
    super(webhookUrl, httpClient);
  }

  static get() {
    return new SlackService(
      EnvService.get(EnvKey.SLACK_WEBHOOK_URL),
      new HttpClient(),
    );
  }

  /**
   * 文字列を送信する.
   */
  sendText(text: string) {
    return this.httpClient.post(this.webhookUrl, { text });
  }

  /**
   * attachments付きメッセージを送信する.
   */
  notify(title: string, value: string, color?: ColorType) {
    return this.sendAttachment(title, value, color);
  }

  notifySuccess(title: string, value: string) {
    return this.sendAttachment(title, value, ColorType.GREEN);
  }

  notifyFailure(title: string, value: string) {
    return this.sendAttachment(title, value, ColorType.RED);
  }
}
