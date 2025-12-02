import { Blob, Byte } from "src/service/common/dto/GoogleAppsScriptDto";

/**
 * Blob関連のサービス。
 */
export class BlobService {
  static get() {
    return new BlobService();
  }

  private getUtilities() {
    return Utilities; // Utilities is built-in class. see: https://developers.google.com/apps-script/reference/utilities/utilities
  }

  /**
   * Blob を生成する。
   */
  newBlob(data: Byte[] | string, contentType?: string, name?: string): Blob {
    if (typeof data === "string") {
      return this.getUtilities().newBlob(data, contentType, name);
    } else {
      return this.getUtilities().newBlob(data, contentType, name);
    }
  }

  /**
   * JSONからBlobを生成する（UTF-8）。
   */
  newBlobFromJson(obj: object, name?: string): Blob {
    const json = JSON.stringify(obj);
    return this.newBlob(json, "application/json; charset=utf-8", name);
  }
}
