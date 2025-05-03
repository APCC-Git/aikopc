# AikoPC.net

> **開発中**  
> アイデアは [こちら](#アイデア) に記載

誰かNext書けるようになってや(´;ω;｀)  
共有メアドはAPCC-Official@outlook.jp

---

## Getting Started
```shell
npm install
npm run dev
```
<localhost:3000>に開発サーバが立ち上がるぞ！

---
## 使用技術
| 言語・フレームワーク        | バージョン   |
|-------------------|---------|
| Node.js           | 22.14.0 |
| React             | 19.0.0  |
| Next.js           | 15.3.1  |
| TypeScript        | 5.8.3   |
| TailwindCSS       | v4      |
---

## ホスト
Cloudflare Pagesにデプロイ予定

---

## ディレクトリ構成
```
├── app          ... ルーティングに関するコンポーネント
├── features     ... ロジック + コンポーネントをまとめたもの
│   ├── common   ... 共通部分
│   └── routes   ... 特定のページで使うもの
├── components   ... ロジックがない共通コンポーネント
├── hooks        ... 共通ロジックの内、React Hooksが「ある」もの
├── utils        ... 共通ロジックの内、React Hooksが「ない」もの
└── constants    ... 定数を定義したファイル
```
 - `app`内では`'use client'`を使わない！
 - 詳しくは[この記事](https://qiita.com/miumi/items/359b8a77bbb6f9666950)を参照

---

## アイデア
 - GSAP を使ってアニメーション強化
 - Three.js（R3F）で3D演出

---

## 開発メモ
* 保守性の高いコードを書こう！
  * 適度にコメントを書く
  * シンプルなコード
  * わかりやすい変数名
  * マジックナンバーは避ける
* **main ブランチに直接コミットしない！**
  * main への push は即座に Cloudflare Pages に反映されるぞ！
  * `develop`ブランチを切ってpush