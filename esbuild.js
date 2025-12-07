import esbuild from "esbuild";
import { GasPlugin } from "esbuild-gas-plugin";
import fs from "fs";
import path from "path";

/**
 * [Plugin] 毎ビルド時に出力先(dist)をクリーンアップする。
 * 上書きする形だと、古いビルド成果物が残り誤動作する可能性があるため。
 */
const CleanupPlugin = {
  name: "cleanup-dist",
  setup(build) {
    build.onStart(() => {
      try {
        const distDir = path.resolve("dist");
        fs.rmSync(distDir, { recursive: true, force: true });
        console.log("✅ successfully removed dist/ directory");
      } catch (error) {
        console.error("❌ failed to remove dist/ directory", error);
      }
    });
  },
};

/**
 * [Plugin] マニフェストファイル(appsscript.json)を必ずビルド成果物として含める。
 * GASプロジェクトの設定情報を保持するために必要。
 */
const CopyManifestFilePlugin = {
  name: "copy-manifest-file",
  setup(build) {
    build.onEnd(() => {
      try {
        const srcPath = path.resolve("appsscript.json");
        const distPath = path.resolve("dist/appsscript.json");
        fs.copyFileSync(srcPath, distPath);
        console.log("✅ successfully copied appsscript.json to dist/");
      } catch (error) {
        console.error("❌ failed to copy appsscript.json to dist/", error);
      }
    });
  },
};

/**
 * esbuildのビルド設定
 */
const buildContext = await esbuild.context({
  entryPoints: ["src/main.ts"],
  outfile: "dist/main.gs",
  bundle: true,
  minify: false, // GASエディタ上でのデバックしやすさを優先してminifyは無効化しておく。
  plugins: [CleanupPlugin, GasPlugin, CopyManifestFilePlugin],
  target: ["es2018"], // 2018指定は適当。GASのV8ランタイムが確実に対応してそうなECMAScriptのバージョンに合わせるため。
  resolveExtensions: [".js", ".ts"],
  logLevel: "debug",
});

/**
 * ビルド実行
 */
const isWatch = process.argv.includes("--watch");
if (isWatch) {
  await buildContext.watch();
  console.log("👀 watching for changes...");
} else {
  try {
    await buildContext.rebuild();
    await buildContext.dispose();
    console.log("✅ successfully built to dist/");
  } catch (error) {
    console.error("❌ failed to build to dist/", error);
    process.exit(1);
  }
}
