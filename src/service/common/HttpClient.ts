import type {
  HTTPResponse,
  Payload,
  UrlFetchApp,
  URLFetchRequestOptions,
} from "src/service/common/dto/GoogleAppsScriptDto";
import { HttpMethod } from "src/service/common/dto/GoogleAppsScriptDto";

/**
 * HTTP通信を行うクライアント.
 */
export class HttpClient {
  private getUrlFetchApp(): UrlFetchApp {
    return UrlFetchApp; // UrlFetchApp is built-in class. see: https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app?hl=ja
  }

  private request(method: HttpMethod, url: string, payload?: Payload) {
    const options: URLFetchRequestOptions = {
      method,
      contentType: "application/json",
      ...(payload ? { payload: JSON.stringify(payload) } : {}),
    };
    try {
      const httpResponse: HTTPResponse = this.getUrlFetchApp().fetch(
        url,
        options
      );
      const contentText = httpResponse.getContentText();
      try {
        return JSON.parse(contentText);
      } catch (parseError) {
        return contentText;
      }
    } catch (fetchError: any) {
      console.error("❌ UrlFetchApp.fetch error:", fetchError);
    }
  }

  get(url: string) {
    return this.request(HttpMethod.GET, url);
  }

  post(url: string, payload: Payload) {
    return this.request(HttpMethod.POST, url, payload);
  }
}
