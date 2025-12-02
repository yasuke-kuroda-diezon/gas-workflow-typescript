import { EnvKey } from "src/service/common/EnvService";

/**
 * 環境変数の値が見つからない場合のエラー.
 */
export class EnvNotFoundError extends Error {
  constructor(envKey: EnvKey) {
    const message = `スクリプト プロパティ '${envKey}' が見つかりません。\n設定箇所はこちら: https://diezon.gyazo.com/88b474009685d23c9a4dbbd6f2d93440`;
    super(message);
    this.name = "EnvNotFoundError";
  }
}
