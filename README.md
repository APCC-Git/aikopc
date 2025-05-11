# AikoPC.net

> **開発中**  
> アイデアは [こちら](#アイデア) に記載

誰かNext.js書けるようになってや(´;ω;｀)  
共有メアドは APCC-Official@outlook.jp


## Getting Started
このリポジトリをクローン
```shell
npm install
npm run dev
```
<http://localhost:3000>に開発サーバが立ち上がるぞ！

## 使用技術
| 言語・フレームワーク        | バージョン   |
|-------------------|---------|
| Node.js           | 22.14.0 |
| React             | 19.0.0  |
| Next.js           | 15.3.1  |
| TypeScript        | 5.8.3   |
| TailwindCSS       | v4      |

## ホスト
conoha vpsにデプロイ予定  
github actionsを使用して自動デプロイ

## ディレクトリ構成
```
src
├── app          ... ルーティングに関するコンポーネント
├── features     ... ロジック + コンポーネントをまとめたもの
│   ├── common   ... 共通部分
│   └── routes   ... 特定のページで使うもの
├── components   ... ロジックがない共通コンポーネント
├── hooks        ... 共通ロジックの内、React Hooksが「ある」もの
├── utils        ... 共通ロジックの内、React Hooksが「ない」もの
├── constants    ... 定数を定義したファイル
├── types        ... 型を定義したファイル
└── lib          ... apiなど
```
 - 詳しくは[この記事](https://qiita.com/miumi/items/359b8a77bbb6f9666950)を参照

---

## 開発メモ
* 保守性の高いコードを書こう！
  * 適度にコメントを書く
  * シンプルなコード
  * わかりやすい変数名
  * マジックナンバーは避ける
* **main ブランチに直接コミットしない！**
  * `develop`ブランチを切ってpush
---

## アイデア
* モチーフ
  * ~~PCのパーツ~~
    * ~~電源ボタン~~
    * ~~マザーボード~~
    * ~~モニター~~
    * ~~ハードディスク~~
  * モチーフカラー
    * ~~白/グレーでダークモードに応じて反転~~
    * ~~アクセントカラー一色(オレンジとか蛍光イエローとか)~~
* ~~ミリタリー的デザイン~~
  * ~~ [こういうの](https://www.istockphoto.com/jp/%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88/%E3%82%B5%E3%82%A4%E3%83%90%E3%83%BC%E3%83%91%E3%83%B3%E3%82%AF)(iStock)~~
  * ~~ [こういうの](images/img.png)(Hiby R4)~~
  * ~~ [こういうの](images/img_1.png)(モバ充)~~
* shadcn/uiでモダンui
  * ログイン機能
    * ブログ作成
    * プロジェクトの進捗管理

## ToDo
+ [ ] カルーセル用の画像探す・取る
+ [ ] Aboutページを作る
+ [x] ブログのスタイリング
+ [ ] 記事ページに関連記事機能を実装
+ [ ] 部員ログイン機能を作る
+ [ ] ブログページをOn-demand ISRに対応させる [この記事](https://blog.microcms.io/on-demand-isr/)を参照 (microcmsのwebhook的にデプロイ後でないと難しそう)
+ [ ] Github Actions設定
