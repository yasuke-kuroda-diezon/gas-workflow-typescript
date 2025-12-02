import { ColorType } from "src/service/common/ColorType";
import { HttpClient } from "src/service/common/HttpClient";

export abstract class AbstractSlackService {
  constructor(
    protected readonly webhookUrl: string,
    protected readonly httpClient: HttpClient,
  ) {}

  /**
   * attachments付きメッセージを送信する.
   */
  protected sendAttachment(
    title: string,
    value: string,
    color: ColorType = ColorType.BLUE,
  ) {
    const payload = {
      attachments: [
        {
          color,
          fields: [{ title, value }],
        },
      ],
    };
    return this.httpClient.post(this.webhookUrl, payload);
  }
}
