# 概要

TypeScriptでGASを開発する。clasp(Command Line Apps Script Projects)を利用してCLIでGASプロジェクトを操作する。

# 前提条件

- Node.js。`v22.0.0`以上
- clasp cliがインストール済み(後述)。
- slack webhook URLが発行済み(後述)。

# はじめる

```
$ git clone git@github.com:yasuke-kuroda-diezon/gas-workflow-typescript.git
$ cd gas-workflow-typescript
$ npm install
```

```
.clasp.json ファイルの scriptId を任意のスクリプトIDに書き換える(必須)。
```

```
$ npm run pull
$ npm run release
```

# 使用方法

GASプロジェクトからプル

```
$ npm run pull
```

ビルド

```
$ npm run build
```

GASプロジェクトにプッシュ

```
$ npm run push
```

一連の操作(tscコンパイル実施→esbuildビルド→GASプロジェクトにプッシュ)

```
$ npm run release
```

フォーマットする

```
$ npm run format
```

## ディレクトリ構成

```
gas-workflow-typescript/
├── .clasp.json          # claspコマンド設定。GASプロジェクトID指定やGASへpushするディレクトリ指定など。
├── .gitignore
├── appsscript.json      # GASマニフェスト。GAS実行環境設定など。GASにpushする。
├── esbuild.js           # ビルドツールの設定。`src/`→`dist/main.gs`へバンドルする際に利用。
├── package.json
├── README.md
├── tsconfig.json        # TypeScript設定。
└── src/                 # ソースコード(Typescript)。
  ├── main.ts            # エントリポイント。
  ├── service/
  │   ├── backlog/       # Backlog関連サービス(ドメイン知識毎にディレクトリ分割)。
  │   │   ├── BacklogService.ts
  │   │   └── dto/
  │   │       └── BacklogDto.ts
  │   ├── common/
  │   │   ├── EnvService.ts       # 環境変数取得サービス
  │   │   └── HttpClient.ts       # HTTPクライアントサービス
  │   ├── gmail/       # Gmail関連サービス。
  │   ├── slack/       # Slack関連サービス。
  │   └── spreadsheet/ # Spreadsheet関連サービス。
  └── usecase/         # ユースケース(シナリオケース)。
    ├── toSlack/       # 例: 処理結果をSlackに通知するユースケース群。
    └── toSpreadsheet/ # 例: 処理結果をSpreadsheetに記録するユースケース群。
```

- 機能構築は`src/service/`配下にドメイン知識毎にサービスを追加実装していくイメージです。
- ユースケース/シナリオケースは`src/usecase/`配下にユースケース毎に追加実装していくイメージです。

# 初回操作

clasp cliをグローバルインストールする(初回のみ)。

```
$ npm install -g @google/clasp
```

- .clasp.json ファイルの scriptId を任意のスクリプトIDに書き換える(初回のみ)。
- Google Apps Script API を有効にする(初回のみ)。
  - [設定 - Apps Script](https://script.google.com/home/usersettings)

- slack webhook URLを発行する(初回のみ)。
  - [Incoming Webhook | Slack Marketplace](https://diezon.slack.com/marketplace/A0F7XDUAZ--incoming-webhook-?next_id=0&tab=settings)

ログイン認証(初回のみ)

```
$ clasp login
```

GASプロジェクトを新規作成する(初回のみ)

```
$ clasp create
```

# 注意

GASプロジェクトにpushすると、GASエディタ上のファイルが上書きされて消えてしまいます。そのため、既存のGASプロジェクトにclaspを導入する場合は、初めてpushする前に必ずpullを実行してください。これにより、現在のGASエディタ上のファイルをローカルに取得し、安全に作業を進めることができます。

# 参考

[TypeScript+clasp+esbuildでGASのローカル開発をもっと便利に](https://zenn.dev/funteractiveinc/articles/776b5812833475)

# Tips

GASプロジェクトをブラウザで開く

```
$ npm run open
```

既存のGASプロジェクトをクローンする

```
$ clasp clone-script "スクリプトID"
```

ステータス確認

```
$ clasp status
```

# 懸念

`.clasp.json`の`projectId`プロパティはgit管理しない方が良い気がするのですが、試行錯誤してできなさそう(大変そう)だったので、一旦Git管理しています。。。`projectId`はよしなに変更ください。

# claspエラー発生時

GASプロジェクトを操作中に以下のようなエラーが発生した場合：

```
{"error":"invalid_grant","error_description":"reauth related error (invalid_rapt)","error_uri":"https://support.google.com/a/answer/9368756","error_subtype":"invalid_rapt"}
```

claspの認証が必要であることを示しています。以下のコマンドを実行して再認証を行ってください：

```
$ clasp login
```
