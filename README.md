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
> [!IMPORTANT]
> .envファイルがないとブログやらログインやらができません。もってる人からもらってね！

## 使用技術
| 言語・フレームワーク  | バージョン   |
|-------------|---------|
| Node.js     | 22.14.0 |
| React       | 19.0.0  |
| Next.js     | 15.3.1  |
| TypeScript  | 5.8.3   |
| TailwindCSS | v4      |
| PostgreSQL  | 16.9    |


## ホスト
Conoha VPSにデプロイ + nginxで公開  
6Rix6が作成した`deploy.sh`を実行すれば自動でデプロイされる。(sshの秘密鍵が必要)
#### prisma studio　の転送方法
```shell
# vps側で
npx prisma studio

# クライアント側で
ssh -L 5555:localhost:5555 [username]@[hostname]
# → localhost:5555
```

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
└── lib          ... ユーティリティ関数
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
* shadcn/uiでモダンui
  * ログイン機能
    * ブログ作成
    * プロジェクトの進捗管理
  * ギャラリーページ

## ToDo
+ [ ] カルーセル用の画像探す・撮る
+ [ ] 関連記事機能のロジック変更(containにする)
+ [ ] ダッシュボード画面作る
+ [ ] アイキャッチの実装方法考える
+ [ ] AIでブログかけるようにする
+ [ ] DB管理
+ [ ] ブログページをOn-demand ISRに対応させる [この記事](https://blog.microcms.io/on-demand-isr/)を参照 (microcmsのwebhook的にデプロイ後でないと難しそう)
+ [ ] [SSL 証明書を取得する (Let's Encrypt)](https://www.server-world.info/query?os=CentOS_Stream_9&p=ssl&f=2)
+ [ ] (SSL対応したら)CookieをSecure:trueに設定(auth/login)
+ [ ] iPadのレイアウト作る