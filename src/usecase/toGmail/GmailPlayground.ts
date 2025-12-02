import { GmailService } from "src/service/gmail/GmailService";
import { BlobService } from "src/service/common/BlobService";

/**
 * シナリオケース: Gmail送信の動作確認用Playground.
 *
 */
export class GmailPlayground {
  gmailPlayground() {
    const NAME = "yasuke.kuroda";
    const DOMAIN = "diezon.co.jp";
    const to = `${NAME}@${DOMAIN}`;
    const cc = `${NAME}+cc@${DOMAIN}`;
    const bcc = `${NAME}+bcc@${DOMAIN}`;
    const replyTo = `${NAME}+replyTo@${DOMAIN}`;

    const gmailService = GmailService.get();

    // 基本
    gmailService.sendEmail(to, "件名", "本文");

    // CC/BCC
    gmailService.sendEmail(to, "件名(CC/BCC有)", "本文(CC/BCC有)", {
      cc,
      bcc,
    });

    // HTML
    gmailService.sendEmail(to, "件名(HTML)", "本文(HTML)", {
      htmlBody:
        '<p style="color:red;">この文字は赤色になっているはずです。</p>',
    });

    // replyTo
    gmailService.sendEmail(to, "件名(replyTo)", "本文(replyTo)", {
      replyTo,
    });

    // 添付
    const blobService = BlobService.get();
    const txtBlob = blobService.newBlob("sample", "text/plain", "sample.txt");
    const jsonBlob = blobService.newBlobFromJson({ message: "this is sample" });
    gmailService.sendEmail(to, "件名(添付)", "本文(添付)", {
      attachments: [txtBlob, jsonBlob],
    });
  }

  static execute() {
    try {
      new GmailPlayground().gmailPlayground();
    } catch (error) {
      throw new Error(error.message ? error.message : error);
    }
  }
}
