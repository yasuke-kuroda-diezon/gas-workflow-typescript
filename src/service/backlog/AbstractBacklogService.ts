import { HttpClient } from "src/service/common/HttpClient";

export type AdditionalParams = Record<
  string,
  string | number | boolean | Array<string | number | boolean>
>;

/**
 * Backlogサービスの抽象クラス.
 */
export class AbstractBacklogService {
  constructor(
    protected readonly backlogDomain: string,
    protected readonly backlogApiKey: string,
    protected readonly httpClient: HttpClient,
  ) {}

  /**
   * API URI を構築する
   * endpointPath: 例 '/api/v2/users/myself'
   * additionalParams: 例 追加クエリ { foo: 'bar' }
   */
  protected buildUri(
    endpointPath: string,
    additionalParams: AdditionalParams = {},
  ): string {
    const endpointUrl = `${this.backlogDomain}${endpointPath}`;
    const queryParams = {
      ...additionalParams,
      apiKey: this.backlogApiKey,
    };
    const queryString = Object.keys(queryParams)
      .map((paramKey) => {
        const paramValue = queryParams[paramKey];
        const encodedKey = encodeURIComponent(paramKey);
        if (Array.isArray(paramValue)) {
          return paramValue
            .map((v) => `${encodedKey}=${encodeURIComponent(v)}`)
            .join("&");
        }
        return `${encodedKey}=${encodeURIComponent(String(paramValue))}`;
      })
      .join("&");

    return `${endpointUrl}?${queryString}`;
  }
}
