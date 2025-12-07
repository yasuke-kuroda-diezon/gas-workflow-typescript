import type {
  GmailApp,
  GmailThread,
  GmailAdvancedOptions,
} from "src/service/common/dto/GoogleAppsScriptDto";

/**
 * Gmail関連のサービス.
 */
export class GmailService {
  static get() {
    return new GmailService();
  }

  private getGmailApp(): GmailApp {
    return GmailApp; // GmailApp is built-in class. see: https://developers.google.com/apps-script/reference/gmail/gmail-app?hl=ja
  }

  /**
   * 未読メール件数を集計する.
   */
  getUnreadMessageCount(): number {
    const query = "is:unread";
    const gmailThreads: GmailThread[] = this.getGmailApp().search(query);
    const total = gmailThreads.reduce(
      (sum, gmailThread) => sum + gmailThread.getMessageCount(),
      0,
    );
    return total;
  }

  /**
   * メールを送信する.
   * @param recipient 宛先メールアドレス
   * @param subject 件名
   * @param body 本文
   * @param options 追加オプション（cc、bcc、name、replyTo、htmlBody など）
   */
  sendEmail(
    recipient: string,
    subject: string,
    body: string,
    options: GmailAdvancedOptions = {},
  ): GmailApp {
    return this.getGmailApp().sendEmail(recipient, subject, body, options);
  }
}
