# 星が崎城跡 守り主AR

このフォルダは、星が崎城跡向けの **1地点・1キャラ・日英切替** の WebAR 試作用です。

## 中に入っているもの
- `index.html` : 画面本体
- `style.css` : 見た目
- `app.js` : 動き
- `messages.js` : 日本語 / 英語テキスト
- `manifest.webmanifest` / `sw.js` : かんたんなPWA用
- `assets/spirit.png` : 背景を整理した守り主画像
- `assets/marker.png` : 認識札画像

## まだ1つだけ必要なもの
このままでは **`assets/hoshigasaki.mind`** が入っていないため、画像認識そのものはまだ始まりません。

MindAR 用のターゲットファイルを、`assets/marker.png` から生成して  
**`assets/hoshigasaki.mind`** という名前で保存してください。

## いちばん簡単な流れ
1. このフォルダを GitHub に置く
2. GitHub Pages か Vercel で HTTPS 公開する
3. `assets/marker.png` から `assets/hoshigasaki.mind` を作って入れる
4. スマホで `index.html` を開く
5. 「守り主に会う」を押す
6. 認識札をカメラで映す

## 画像差し替え
- 守り主画像を変えるときは `assets/spirit.png`
- 認識札を変えるときは `assets/marker.png`
- 認識札を変えたら `.mind` も作り直してください

## 小学生向けに言うと
- `marker.png` は「よびだすための札」
- `spirit.png` は「出てくる守り主」
- `.mind` は「スマホが札を見つけるためのメモ」

## 補足
今回はできるだけすぐ試せる形にそろえていますが、  
`.mind` ファイルだけは MindAR 用の変換が必要です。
