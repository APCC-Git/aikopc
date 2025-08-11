# Aikopc.net

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

<details>
<summary>postgreSQLインストール&Prisma設定方法</summary>
以下はUbuntuでの例です

```shell
# aptリポジトリの登録
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh

# postgresql16.9のインストール
sudo apt install postgresql-16

# ロールとDBの作成
sudo su - postgres
psql # postgresの対話ターミナルにログイン
create role ROLE_NAME with login password 'PASSWORD'; # ROLE_NAMEはLinuxの自分のユーザー名と同じものを設定
alter role ROLE_NAME with createdb; # 権限付与
create database user_data with owner=ROLE_NAME locale='C' template='template0';
# ctrl+d ×2で自分のユーザーのターミナルに戻る

# Prismaの設定
touch .env && echo 'DATABASE_URL="postgresql://ROLE_NAME:PASSWORD@localhost:5432/user_data"' > .env
npx prisma db push
npx prisma generate


```
</details>

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
`deploy.sh`を実行すれば自動でデプロイされる。(gitリポジトリに含めていません)

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
├── components   ... ロジックがない共通コンポーネント
│   ├── common   ... 共通コンポーネント
│   ├── visitor  ... (visitor)内でのみ使用するコンポーネント
│   └── dashboard... (user)内でのみ使用するコンポーネント
├── hooks        ... 自作のReact Hooks等
├── constants    ... 定数を定義したファイル
├── types        ... 型を定義したファイル
├── styles       ... スタイルシート
└── lib          ... ユーティリティ関数
```
単一ページ内でのセクションをコンポーネント化する場合はそのページの`page.tsx`と同階層に`_components`フォルダを作成しそちらにまとめる。  
詳しくは[この記事](https://qiita.com/miumi/items/359b8a77bbb6f9666950)を参照

---

## 開発メモ

- 保守性の高いコードを書こう！
  - 適度にコメントを書く
  - シンプルなコード
  - わかりやすい変数名
  - マジックナンバーは避ける
  - 分割できるファイルは分割してファイルの肥大化を避ける

---

## アイデア

- shadcn/uiでモダンui
  - ログイン機能
    - プロジェクトの進捗管理
  - ギャラリーページ

## ToDo

- [ ] UIキット自作する(chadcnを改変？)
- [ ] DB管理
- [x] [SSL 証明書を取得する (Let's Encrypt)](https://www.server-world.info/query?os=CentOS_Stream_9&p=ssl&f=2)
- [x] (SSL対応したら)CookieをSecure:trueに設定(auth/login)
