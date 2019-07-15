# quesdon

ザ・インタビューズとかaskfmとかそういうののMastodon版

LICENSE: [AGPL 3.0](LICENSE)

## 魔改造アリ

[![Build Status](https://travis-ci.org/cutls/quesdon.svg?branch=misskey)](https://travis-ci.org/cutls/quesdon)

Cutlsが勝手にいじったもの[Quesdon(toot.app)](https://quesdon.toot.app)

* DMで質問の通知が来る。`TOOT_ORIGIN`にインスタンス名を、`TOOT_TOKEN`にアクセストークンを渡して起動する。オプトアウト方法等はない(アカウントをミュートしたら終わり)。
* Misskeyでログインできる。投稿もできる。
* 未回答の質問をインポートする(ブックマークレットと合わせて公開)
* `ADMIN`に小文字にしたacct(cutls@cutls.comなど)を指定してAdminを指定。
  + Adminはユーザーを凍結することができます。(WebUIあり)
  + Adminは回答をNSFWに設定することができます。(WebUIあり)

## how to run

required: latest version Node.js, MongoDB

```sh
yarn install
yarn build
MONGODB_URL=mongodb://localhost/quesdon BACK_PORT=3000 yarn start
```

## 開発のしかた

### 開発環境を立てる

`cp .env.development .env`したあと`yarn dev`とするといろいろwatchしながら動くやつが立ち上がるのであとは <http://localhost:8080> を開くだけ

### ファイル構造

言わなくても見ればわかると思いますが念のため

- `src/`: ソース一式
    - `server/`: サーバーサイドのソース
        - `api/`: APIまわりが入ってるやつ
        - `db/`: データベースのModel
        - `utils/`: あちこちで使うやつ
    - `client/`: クライアントのソース
- `views/`: サーバーサイドが見るテンプレート(pugで書かれている)