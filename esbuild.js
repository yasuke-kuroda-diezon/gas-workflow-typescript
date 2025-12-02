import esbuild from "esbuild";
import { GasPlugin } from "esbuild-gas-plugin";
import fs from "fs";
import path from "path";

// dist/を削除せずに上書きする形だと、古いビルド成果物が残り誤動作する可能性があるので、
// 毎ビルド時に出力先ディレクトリ(dist)をクリーンアップするようにしています。
const CleanupPlugin = {
  name: "cleanup-dist",
  setup(build) {
    build.onStart(() => {
      const distDir = path.resolve("dist");
      if (fs.existsSync(distDir)) {
        try {
          fs.rmSync(distDir, { recursive: true, force: true });
        } catch (error) {
          console.error("distディレクトリの削除に失敗しました", error);
        }
      }
    });
  },
};

esbuild
  .build({
    entryPoints: ["src/main.ts"],
    outfile: "dist/main.gs",
    bundle: true, // true: ビルド成果物が1つのファイルにまとめられます。
    minify: false, // true: ビルド成果物が1行のminifyファイルになり実行時のパフォーマンスは上がりますが、実行エラー時にデバックが困難になるためfalseにしています..。
    plugins: [CleanupPlugin, GasPlugin],
    target: ["es2018"], // JSバージョンをダウングレード。GASのV8ランタイムが確実に対応しているECMAScriptのバージョンに合わせるため。2018指定は適当です。
    resolveExtensions: [".js", ".ts"],
    logLevel: "debug",
  })
  .then(() => {
    const distDir = path.resolve("dist");
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // マニフェストファイル(appsscript.json)を必ずビルド成果物として含めるために行なっています
    const srcPath = path.resolve("appsscript.json");
    const distPath = path.join(distDir, "appsscript.json");
    fs.copyFileSync(srcPath, distPath);
  })
  .catch((error) => {
    console.error("ビルドに失敗しました", error);
    process.exit(1);
  });
