// package.json が指しているファイルが、ビルド後に実在するかを確かめる。
//
// main / exports が存在しないファイルを指していても npm publish は成功する。
// 実際 2.2.1 まで main と exports.require が dist/cyberseeds-ui-rhf-umd.cjs
// （正しくは cyberseeds-ui-rhf.umd.cjs）を指しており、公開物から
// require('cyberseeds-ui-rhf') が MODULE_NOT_FOUND で失敗していた。
// アプリ側が ESM なので長く気づかれなかった。
//
// npm run build のあとに実行する。

import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

const missing = [];

const check = (label, rel) => {
  if (typeof rel !== "string") return;
  if (!existsSync(resolve(root, rel))) missing.push({ label, rel });
};

check("main", pkg.main);
check("module", pkg.module);
check("types", pkg.types);

// exports は条件が入れ子になりうるので再帰でたどる
const walk = (node, path) => {
  if (typeof node === "string") return check(path, node);
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) walk(value, `${path}.${key}`);
  }
};
walk(pkg.exports, "exports");

if (missing.length > 0) {
  console.error("❌ package.json が存在しないファイルを指している:");
  for (const { label, rel } of missing) console.error(`   ${label} -> ${rel}`);
  console.error("");
  console.error("   npm run build を先に流したか、参照先の綴りを確認する。");
  process.exit(1);
}

console.log("✅ package.json の参照先はすべて実在する");
